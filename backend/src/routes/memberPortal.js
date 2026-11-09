const express = require('express');
const bcrypt = require('bcryptjs');
const crypto = require('node:crypto');
const jwt = require('jsonwebtoken');
const { rateLimit } = require('express-rate-limit');
const { ObjectId } = require('mongodb');
const { getDatabase } = require('../config/database');
const { getJwtSecret } = require('../utils/tokens');
const { addCalendarMonth } = require('../utils/dates');
const { sendMembershipEmail, getEmailConfig, DEFAULT_CONTACT_EMAIL } = require('../services/membershipEmail');

const router = express.Router();
const accessLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { success: false, message: 'Too many access attempts. Please try again in 15 minutes.' },
});

const recoveryRequestLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 3,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { success: false, message: 'Too many recovery requests. Please try again in 15 minutes.' },
});
const recoveryVerifyLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { success: false, message: 'Too many verification attempts. Please try again in 15 minutes.' },
});

function createMemberToken(member) {
  return jwt.sign({ type: 'member', accessCodeUpdatedAt: member.accessCodeUpdatedAt?.toISOString() || null }, getJwtSecret(), {
    subject: member._id.toString(),
    expiresIn: '12h',
    issuer: 'riptides-membership-api',
    audience: 'riptides-member-portal',
  });
}

async function requireMember(req, res, next) {
  const authorization = req.headers.authorization || '';
  if (!authorization.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Please sign in to your membership portal.' });
  }
  try {
    const payload = jwt.verify(authorization.slice(7), getJwtSecret(), {
      issuer: 'riptides-membership-api',
      audience: 'riptides-member-portal',
    });
    if (payload.type !== 'member' || !ObjectId.isValid(payload.sub)) {
      return res.status(401).json({ success: false, message: 'Invalid membership session.' });
    }
    const member = await getDatabase().collection('members').findOne({ _id: new ObjectId(payload.sub) });
    if (!member) return res.status(401).json({ success: false, message: 'Membership record not found.' });
    const currentAccessVersion = member.accessCodeUpdatedAt?.toISOString() || null;
    if (payload.accessCodeUpdatedAt !== currentAccessVersion) {
      return res.status(401).json({ success: false, message: 'Your access code was reset. Please sign in with your new code.' });
    }
    req.member = member;
    next();
  } catch (error) {
    if (['JsonWebTokenError', 'TokenExpiredError'].includes(error.name)) {
      return res.status(401).json({ success: false, message: 'Your session expired. Please sign in again.' });
    }
    console.error('Member portal authentication error:', error);
    return res.status(500).json({ success: false, message: 'Unable to verify membership access.' });
  }
}

function safeMember(member) {
  return {
    membershipId: member.membershipId,
    fullName: member.fullName,
    email: member.email,
    phone: member.phone,
    plan: member.plan,
    status: member.status,
    paymentStatus: member.paymentStatus,
    subscription: member.subscription,
    createdAt: member.createdAt,
    payments: (member.payments || []).map(({ amount, currency, method, status, purpose, recordedAt, confirmedAt, appliedAt }) => ({
      amount, currency, method, status, purpose, recordedAt, confirmedAt, appliedAt,
    })),
  };
}

router.post('/access', accessLimiter, async (req, res) => {
  try {
    const membershipId = typeof req.body?.membershipId === 'string' ? req.body.membershipId.trim().toUpperCase() : '';
    const accessCode = typeof req.body?.accessCode === 'string' ? req.body.accessCode.trim().toUpperCase() : '';
    if (!membershipId || !/^\d{4}$/.test(accessCode)) {
      return res.status(400).json({ success: false, message: 'Enter your membership reference and 4-digit numeric access code.' });
    }
    const member = await getDatabase().collection('members').findOne({ membershipId });
    if (!member || !member.accessCodeHash || !(await bcrypt.compare(accessCode, member.accessCodeHash))) {
      return res.status(401).json({ success: false, message: 'Membership reference or access code is incorrect.' });
    }
    return res.json({ success: true, token: createMemberToken(member), member: safeMember(member) });
  } catch (error) {
    console.error('Member portal sign-in error:', error);
    return res.status(500).json({ success: false, message: 'Unable to sign in right now.' });
  }
});


/**
 * Request a one-time email verification code to recover an existing membership ID.
 * Always returns the same public response so the endpoint does not disclose whether
 * an email address belongs to a member.
 */
router.post('/recover-id/request', recoveryRequestLimiter, async (req, res) => {
  const genericMessage = 'If that email belongs to a membership, a verification code has been sent.';
  try {
    const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
      return res.status(400).json({ success: false, message: 'Enter a valid email address.' });
    }

    const emailConfig = getEmailConfig();
    if (!emailConfig.apiKey || !emailConfig.from) {
      return res.status(503).json({ success: false, message: 'Email verification is temporarily unavailable. Please contact the RipTides team.' });
    }

    const members = getDatabase().collection('members');
    const member = await members.findOne({ email }, { projection: { membershipId: 1 } });
    if (member) {
      const code = String(crypto.randomInt(0, 1000000)).padStart(6, '0');
      const codeHash = crypto.createHash('sha256').update(code).digest('hex');
      const now = new Date();
      const recovery = getDatabase().collection('membership_id_recovery');
      await recovery.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
      await recovery.updateOne(
        { email },
        { $set: { email, codeHash, attempts: 0, expiresAt: new Date(now.getTime() + 10 * 60 * 1000), createdAt: now } },
        { upsert: true }
      );

      try {
        await sendMembershipEmail({
          to: email,
          subject: 'Your RipTides membership ID verification code',
          text: `We received a request to recover the membership ID linked to this email address.\n\nYour one-time verification code is: ${code}\n\nThis code expires in 10 minutes and can only be used once. If you did not request this, you can ignore this email.\n\nRipTides Cocktails & Grill`,
        });
      } catch (emailError) {
        await recovery.deleteOne({ email });
        console.error('Membership ID recovery email failed:', emailError.message);
        return res.status(503).json({ success: false, message: 'We could not send the verification email. Please try again later or contact RipTides.' });
      }
    }
    return res.json({ success: true, message: genericMessage });
  } catch (error) {
    console.error('Membership ID recovery request error:', error);
    return res.status(500).json({ success: false, message: 'Unable to process the recovery request right now.' });
  }
});

router.post('/recover-id/verify', recoveryVerifyLimiter, async (req, res) => {
  try {
    const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';
    const code = typeof req.body?.code === 'string' ? req.body.code.trim() : '';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !/^\d{6}$/.test(code)) {
      return res.status(400).json({ success: false, message: 'Enter the registered email and 6-digit verification code.' });
    }

    const recovery = getDatabase().collection('membership_id_recovery');
    const record = await recovery.findOne({ email });
    if (!record || record.expiresAt <= new Date() || record.attempts >= 5) {
      if (record && (record.expiresAt <= new Date() || record.attempts >= 5)) await recovery.deleteOne({ _id: record._id });
      return res.status(400).json({ success: false, message: 'The code is invalid or expired. Request a new code and try again.' });
    }

    await recovery.updateOne({ _id: record._id }, { $inc: { attempts: 1 } });
    const submittedHash = crypto.createHash('sha256').update(code).digest('hex');
    const expected = Buffer.from(record.codeHash, 'hex');
    const actual = Buffer.from(submittedHash, 'hex');
    if (expected.length !== actual.length || !crypto.timingSafeEqual(expected, actual)) {
      return res.status(400).json({ success: false, message: 'The code is invalid or expired. Request a new code and try again.' });
    }

    const member = await getDatabase().collection('members').findOne({ email }, { projection: { membershipId: 1 } });
    await recovery.deleteOne({ _id: record._id });
    if (!member) return res.status(400).json({ success: false, message: 'The code is invalid or expired. Request a new code and try again.' });

    return res.json({
      success: true,
      membershipId: member.membershipId,
      message: 'Email verified. This is your existing membership ID. Your access code has not changed.',
    });
  } catch (error) {
    console.error('Membership ID recovery verification error:', error);
    return res.status(500).json({ success: false, message: 'Unable to verify the code right now.' });
  }
});

router.get('/me', requireMember, async (req, res) => {
  return res.json({ success: true, member: safeMember(req.member) });
});

router.post('/cancel', requireMember, async (req, res) => {
  try {
    const members = getDatabase().collection('members');
    const member = req.member;
    if (member.subscription?.status !== 'active' || member.subscription?.cancellationRequestedAt) {
      return res.status(409).json({ success: false, message: 'Only an active membership without an existing cancellation request can be cancelled.' });
    }
    const requestedAt = new Date();
    const oneMonthNotice = addCalendarMonth(requestedAt);
    const paidThrough = member.subscription?.currentPeriodEnd ? new Date(member.subscription.currentPeriodEnd) : oneMonthNotice;
    const effectiveAt = paidThrough > oneMonthNotice ? paidThrough : oneMonthNotice;
    const reason = typeof req.body?.reason === 'string' ? req.body.reason.trim().slice(0, 500) : '';
    const result = await members.updateOne(
      { _id: member._id, 'subscription.status': 'active', 'subscription.cancellationRequestedAt': null },
      { $set: {
        status: 'cancellation_scheduled',
        'subscription.status': 'cancellation_scheduled',
        'subscription.cancellationRequestedAt': requestedAt,
        'subscription.cancellationEffectiveAt': effectiveAt,
        'subscription.cancellationRequestedBy': 'member',
        'subscription.cancellationReason': reason || null,
        'subscription.automaticBillingEnabled': false,
        'subscription.reminderSuppressedAt': requestedAt,
        updatedAt: requestedAt,
      } }
    );
    if (result.modifiedCount !== 1) {
      return res.status(409).json({ success: false, message: 'Membership changed. Refresh the page and try again.' });
    }
    try {
      await sendMembershipEmail({
        to: member.email,
        subject: 'Your RipTides membership cancellation is scheduled',
        text: `Hello ${member.fullName},\n\nWe received your cancellation request for membership ${member.membershipId}. Your membership benefits remain active until ${effectiveAt.toLocaleDateString()}. No automatic refund will be issued. If you have questions, reply to this email or contact ${DEFAULT_CONTACT_EMAIL}.\n\nRipTides Cocktails & Grill`,
      });
    } catch (emailError) {
      console.warn('Member cancellation confirmation email not sent:', emailError.message);
    }
    try {
      await sendMembershipEmail({
        to: DEFAULT_CONTACT_EMAIL,
        subject: `Membership cancellation requested: ${member.membershipId}`,
        text: `A member has requested cancellation.\nName: ${member.fullName}\nReference: ${member.membershipId}\nEmail: ${member.email}\nRequested: ${requestedAt.toISOString()}\nEffective: ${effectiveAt.toISOString()}\nReason: ${reason || 'Not provided'}`,
      });
    } catch (emailError) {
      console.warn('Cancellation notification email not sent:', emailError.message);
    }
    return res.json({
      success: true,
      message: 'Cancellation is scheduled. Your membership benefits remain active until the effective date. No automatic refund is issued.',
      cancellationRequestedAt: requestedAt,
      cancellationEffectiveAt: effectiveAt,
    });
  } catch (error) {
    console.error('Member cancellation request error:', error);
    return res.status(500).json({ success: false, message: 'Unable to schedule cancellation.' });
  }
});

module.exports = router;
