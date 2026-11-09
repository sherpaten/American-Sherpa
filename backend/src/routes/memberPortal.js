const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { rateLimit } = require('express-rate-limit');
const { ObjectId } = require('mongodb');
const { getDatabase } = require('../config/database');
const { getJwtSecret } = require('../utils/tokens');
const { addCalendarMonth } = require('../utils/dates');
const { sendMembershipEmail, DEFAULT_CONTACT_EMAIL } = require('../services/membershipEmail');

const router = express.Router();
const accessLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { success: false, message: 'Too many access attempts. Please try again in 15 minutes.' },
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
    if (!membershipId || !/^[A-F0-9]{12}$/.test(accessCode)) {
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
        text: `Hello ${member.fullName},\\n\\nWe received your cancellation request for membership ${member.membershipId}. Your membership benefits remain active until ${effectiveAt.toLocaleDateString()}. No automatic refund will be issued. If you have questions, reply to this email or contact ${DEFAULT_CONTACT_EMAIL}.\\n\\nRipTides Cocktails & Grill`,
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
