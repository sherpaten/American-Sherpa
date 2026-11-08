const express = require('express');
const crypto = require('node:crypto');
const { ObjectId } = require('mongodb');

const { getDatabase } = require('../config/database');
const {
  getMembershipPlan,
  getPublicMembershipPlans,
} = require('../config/membershipPlans');
const { addCalendarMonth } = require('../utils/dates');
const {
  authenticateToken,
  requireRole,
} = require('../middleware/auth');

const router = express.Router();

function isValidObjectId(value) {
  return typeof value === 'string' && ObjectId.isValid(value);
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function publicMember(member) {
  if (!member) return null;

  return {
    ...member,
    _id: member._id.toString(),
    payments: (member.payments || []).map((payment) => ({
      ...payment,
      _id: payment._id.toString(),
    })),
  };
}

// ========================================
// PUBLIC MEMBERSHIP PLANS
// ========================================

router.get('/plans', (req, res) => {
  return res.json({
    success: true,
    plans: getPublicMembershipPlans(),
  });
});

// ========================================
// REGISTER A MEMBER
// ========================================

router.post('/register', async (req, res) => {
  try {
    const { fullName, email, phone, planId } = req.body || {};

    if (
      typeof fullName !== 'string' ||
      typeof email !== 'string' ||
      typeof phone !== 'string' ||
      !fullName.trim() ||
      !email.trim() ||
      !phone.trim() ||
      typeof planId !== 'string'
    ) {
      return res.status(400).json({
        success: false,
        message: 'Full name, email, phone and membership plan are required.',
      });
    }

    if (fullName.trim().length > 120 || phone.trim().length > 40) {
      return res.status(400).json({
        success: false,
        message: 'Name or phone number is too long.',
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      });
    }

    const plan = getMembershipPlan(planId);

    if (!plan) {
      return res.status(400).json({
        success: false,
        message: 'Please select a valid membership plan.',
      });
    }

    const database = getDatabase();
    const members = database.collection('members');

    const existingMember = await members.findOne({
      email: normalizedEmail,
    });

    if (existingMember) {
      return res.status(409).json({
        success: false,
        message: 'A member with this email already exists.',
      });
    }

    const now = new Date();
    const membershipId = `RT-${now.getFullYear()}-${crypto
      .randomBytes(4)
      .toString('hex')
      .toUpperCase()}`;

    const member = {
      membershipId,
      fullName: fullName.trim(),
      email: normalizedEmail,
      phone: phone.trim(),
      plan: {
        id: plan.id,
        name: plan.name,
        monthlyPrice: plan.monthlyPrice,
        currency: plan.currency,
        billingInterval: plan.billingInterval,
        benefitType: plan.benefitType,
        benefitDetails: plan.benefitDetails,
      },
      subscription: {
        status: 'pending_payment',
        renewalPreference: 'automatic_until_cancelled',
        automaticBillingEnabled: false,
        billingAutomationStatus: 'payment_provider_not_configured',
        currentPeriodStart: null,
        currentPeriodEnd: null,
        nextBillingDate: null,
        cancellationRequestedAt: null,
        cancellationEffectiveAt: null,
      },
      payments: [],
      startDate: null,
      expiryDate: null,
      status: 'pending',
      paymentStatus: 'pending',
      paymentMethod: null,
      createdAt: now,
      updatedAt: now,
    };

    await members.insertOne(member);

    return res.status(201).json({
      success: true,
      message: 'Membership registration submitted. Payment confirmation is required before activation.',
      member: {
        membershipId: member.membershipId,
        fullName: member.fullName,
        email: member.email,
        plan: member.plan,
        status: member.status,
        paymentStatus: member.paymentStatus,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'A member with this email already exists.',
      });
    }

    console.error('Member registration error:', error);

    return res.status(500).json({
      success: false,
      message: 'Unable to register member.',
    });
  }
});

// ========================================
// MEMBER LIST - ADMIN AND STAFF
// ========================================

router.get(
  '/',
  authenticateToken,
  requireRole('admin', 'staff'),
  async (req, res) => {
    try {
      const database = getDatabase();
      const members = database.collection('members');

      const page = Math.max(Number.parseInt(req.query.page, 10) || 1, 1);
      const limit = Math.min(
        Math.max(Number.parseInt(req.query.limit, 10) || 25, 1),
        100
      );

      const filter = {};

      if (typeof req.query.status === 'string' && req.query.status) {
        filter.status = req.query.status;
      }

      if (typeof req.query.planId === 'string' && req.query.planId) {
        filter['plan.id'] = req.query.planId;
      }

      if (typeof req.query.search === 'string' && req.query.search.trim()) {
        const search = escapeRegex(req.query.search.trim());

        filter.$or = [
          { fullName: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { phone: { $regex: search, $options: 'i' } },
          { membershipId: { $regex: search, $options: 'i' } },
        ];
      }

      const [items, total] = await Promise.all([
        members.find(filter)
          .project({ payments: 0 })
          .sort({ createdAt: -1 })
          .skip((page - 1) * limit)
          .limit(limit)
          .toArray(),
        members.countDocuments(filter),
      ]);

      return res.json({
        success: true,
        members: items.map(publicMember),
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      console.error('Member list error:', error);

      return res.status(500).json({
        success: false,
        message: 'Unable to retrieve members.',
      });
    }
  }
);

// ========================================
// VERIFY MEMBER BY MEMBERSHIP ID
// ========================================

router.get(
  '/verify/:membershipId',
  authenticateToken,
  requireRole('admin', 'staff'),
  async (req, res) => {
    try {
      const database = getDatabase();
      const member = await database.collection('members').findOne({
        membershipId: req.params.membershipId.trim().toUpperCase(),
      });

      if (!member) {
        return res.status(404).json({
          success: false,
          message: 'Membership not found.',
        });
      }

      const isActive =
        member.status === 'active' &&
        member.subscription?.status === 'active' &&
        member.subscription?.currentPeriodEnd &&
        new Date(member.subscription.currentPeriodEnd) > new Date();

      return res.json({
        success: true,
        member: {
          membershipId: member.membershipId,
          fullName: member.fullName,
          plan: member.plan,
          status: isActive ? 'active' : member.status,
          isActive: Boolean(isActive),
          currentPeriodEnd: member.subscription?.currentPeriodEnd || null,
        },
      });
    } catch (error) {
      console.error('Member verification error:', error);

      return res.status(500).json({
        success: false,
        message: 'Unable to verify membership.',
      });
    }
  }
);

// ========================================
// MEMBER DETAILS - ADMIN AND STAFF
// ========================================

router.get(
  '/:memberId',
  authenticateToken,
  requireRole('admin', 'staff'),
  async (req, res) => {
    try {
      if (!isValidObjectId(req.params.memberId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid member ID.',
        });
      }

      const database = getDatabase();
      const member = await database.collection('members').findOne({
        _id: new ObjectId(req.params.memberId),
      });

      if (!member) {
        return res.status(404).json({
          success: false,
          message: 'Member not found.',
        });
      }

      return res.json({
        success: true,
        member: publicMember(member),
      });
    } catch (error) {
      console.error('Member details error:', error);

      return res.status(500).json({
        success: false,
        message: 'Unable to retrieve member details.',
      });
    }
  }
);

// ========================================
// RECORD PAYMENT - STAFF CASH / ADMIN CASH OR ONLINE
// ========================================

router.post(
  '/:memberId/payments',
  authenticateToken,
  requireRole('admin', 'staff'),
  async (req, res) => {
    try {
      if (!isValidObjectId(req.params.memberId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid member ID.',
        });
      }

      const { method } = req.body || {};

      if (!['cash', 'online'].includes(method)) {
        return res.status(400).json({
          success: false,
          message: 'Payment method must be cash or online.',
        });
      }

      if (req.user.role === 'staff' && method !== 'cash') {
        return res.status(403).json({
          success: false,
          message: 'Staff can only record cash payments.',
        });
      }

      const database = getDatabase();
      const members = database.collection('members');
      const memberId = new ObjectId(req.params.memberId);
      const member = await members.findOne({ _id: memberId });

      if (!member) {
        return res.status(404).json({
          success: false,
          message: 'Member not found.',
        });
      }

      if (!member.plan?.monthlyPrice || member.subscription?.status === 'cancelled') {
        return res.status(409).json({
          success: false,
          message: 'This membership cannot accept a payment.',
        });
      }

      const payment = {
        _id: new ObjectId(),
        amount: member.plan.monthlyPrice,
        currency: member.plan.currency || 'USD',
        method,
        status: 'pending_confirmation',
        purpose: member.subscription?.status === 'active' ? 'renewal' : 'initial',
        recordedBy: req.user.id,
        recordedAt: new Date(),
        confirmedBy: null,
        confirmedAt: null,
        appliedAt: null,
      };

      await members.updateOne(
        { _id: memberId },
        {
          $push: { payments: payment },
          $set: {
            paymentMethod: method,
            paymentStatus: 'pending_confirmation',
            updatedAt: new Date(),
          },
        }
      );

      return res.status(201).json({
        success: true,
        message: 'Payment recorded and awaiting Admin confirmation.',
        payment: {
          id: payment._id.toString(),
          amount: payment.amount,
          currency: payment.currency,
          method: payment.method,
          status: payment.status,
          purpose: payment.purpose,
        },
      });
    } catch (error) {
      console.error('Payment recording error:', error);

      return res.status(500).json({
        success: false,
        message: 'Unable to record payment.',
      });
    }
  }
);

// ========================================
// CONFIRM PAYMENT - ADMIN ONLY
// ========================================

router.post(
  '/:memberId/payments/:paymentId/confirm',
  authenticateToken,
  requireRole('admin'),
  async (req, res) => {
    try {
      if (
        !isValidObjectId(req.params.memberId) ||
        !isValidObjectId(req.params.paymentId)
      ) {
        return res.status(400).json({
          success: false,
          message: 'Invalid member or payment ID.',
        });
      }

      const database = getDatabase();
      const members = database.collection('members');

      const result = await members.updateOne(
        {
          _id: new ObjectId(req.params.memberId),
          payments: {
            $elemMatch: {
              _id: new ObjectId(req.params.paymentId),
              status: 'pending_confirmation',
            },
          },
        },
        {
          $set: {
            'payments.$.status': 'confirmed',
            'payments.$.confirmedBy': req.user.id,
            'payments.$.confirmedAt': new Date(),
            paymentStatus: 'confirmed',
            updatedAt: new Date(),
          },
        }
      );

      if (result.modifiedCount !== 1) {
        return res.status(409).json({
          success: false,
          message: 'Payment was not found or has already been processed.',
        });
      }

      return res.json({
        success: true,
        message: 'Payment confirmed. Admin can now activate or renew the membership.',
      });
    } catch (error) {
      console.error('Payment confirmation error:', error);

      return res.status(500).json({
        success: false,
        message: 'Unable to confirm payment.',
      });
    }
  }
);

// ========================================
// ACTIVATE MEMBERSHIP - ADMIN ONLY
// ========================================

router.post(
  '/:memberId/activate',
  authenticateToken,
  requireRole('admin'),
  async (req, res) => {
    try {
      const { paymentId } = req.body || {};

      if (
        !isValidObjectId(req.params.memberId) ||
        !isValidObjectId(paymentId)
      ) {
        return res.status(400).json({
          success: false,
          message: 'Valid member ID and confirmed payment ID are required.',
        });
      }

      const database = getDatabase();
      const members = database.collection('members');
      const memberId = new ObjectId(req.params.memberId);
      const paymentObjectId = new ObjectId(paymentId);
      const member = await members.findOne({
        _id: memberId,
        'payments._id': paymentObjectId,
      });

      if (!member) {
        return res.status(404).json({
          success: false,
          message: 'Member or payment not found.',
        });
      }

      const payment = (member.payments || []).find(
        (item) => item._id.equals(paymentObjectId)
      );

      if (
        payment.status !== 'confirmed' ||
        payment.appliedAt ||
        !['pending_payment', 'expired'].includes(member.subscription?.status)
      ) {
        return res.status(409).json({
          success: false,
          message: 'A confirmed, unused initial payment is required for activation.',
        });
      }

      const now = new Date();
      const periodEnd = addCalendarMonth(now);

      const result = await members.updateOne(
        {
          _id: memberId,
          'subscription.status': { $in: ['pending_payment', 'expired'] },
          payments: {
            $elemMatch: {
              _id: paymentObjectId,
              status: 'confirmed',
              appliedAt: null,
            },
          },
        },
        {
          $set: {
            status: 'active',
            paymentStatus: 'paid',
            paymentMethod: payment.method,
            startDate: now,
            expiryDate: periodEnd,
            'subscription.status': 'active',
            'subscription.currentPeriodStart': now,
            'subscription.currentPeriodEnd': periodEnd,
            'subscription.nextBillingDate': periodEnd,
            'subscription.cancellationRequestedAt': null,
            'subscription.cancellationEffectiveAt': null,
            'payments.$.appliedAt': now,
            'payments.$.appliedBy': req.user.id,
            updatedAt: now,
          },
        }
      );

      if (result.modifiedCount !== 1) {
        return res.status(409).json({
          success: false,
          message: 'Membership changed before activation. Refresh and try again.',
        });
      }

      return res.json({
        success: true,
        message: 'Membership activated successfully.',
        currentPeriodStart: now,
        currentPeriodEnd: periodEnd,
      });
    } catch (error) {
      console.error('Membership activation error:', error);

      return res.status(500).json({
        success: false,
        message: 'Unable to activate membership.',
      });
    }
  }
);

// ========================================
// RENEW MEMBERSHIP - ADMIN ONLY
// ========================================

router.post(
  '/:memberId/renew',
  authenticateToken,
  requireRole('admin'),
  async (req, res) => {
    try {
      const { paymentId } = req.body || {};

      if (
        !isValidObjectId(req.params.memberId) ||
        !isValidObjectId(paymentId)
      ) {
        return res.status(400).json({
          success: false,
          message: 'Valid member ID and confirmed payment ID are required.',
        });
      }

      const database = getDatabase();
      const members = database.collection('members');
      const memberId = new ObjectId(req.params.memberId);
      const paymentObjectId = new ObjectId(paymentId);
      const member = await members.findOne({
        _id: memberId,
        'payments._id': paymentObjectId,
      });

      if (!member) {
        return res.status(404).json({
          success: false,
          message: 'Member or payment not found.',
        });
      }

      const payment = (member.payments || []).find(
        (item) => item._id.equals(paymentObjectId)
      );

      if (
        payment.status !== 'confirmed' ||
        payment.appliedAt ||
        member.subscription?.status !== 'active' ||
        member.subscription?.cancellationRequestedAt
      ) {
        return res.status(409).json({
          success: false,
          message: 'A confirmed unused payment and an active, non-cancelling membership are required.',
        });
      }

      const now = new Date();
      const currentPeriodEnd = new Date(member.subscription.currentPeriodEnd);
      const periodStart = currentPeriodEnd > now ? currentPeriodEnd : now;
      const periodEnd = addCalendarMonth(periodStart);

      const result = await members.updateOne(
        {
          _id: memberId,
          'subscription.status': 'active',
          'subscription.cancellationRequestedAt': null,
          payments: {
            $elemMatch: {
              _id: paymentObjectId,
              status: 'confirmed',
              appliedAt: null,
            },
          },
        },
        {
          $set: {
            status: 'active',
            paymentStatus: 'paid',
            paymentMethod: payment.method,
            expiryDate: periodEnd,
            'subscription.currentPeriodStart': periodStart,
            'subscription.currentPeriodEnd': periodEnd,
            'subscription.nextBillingDate': periodEnd,
            'payments.$.appliedAt': now,
            'payments.$.appliedBy': req.user.id,
            updatedAt: now,
          },
        }
      );

      if (result.modifiedCount !== 1) {
        return res.status(409).json({
          success: false,
          message: 'Membership changed before renewal. Refresh and try again.',
        });
      }

      return res.json({
        success: true,
        message: 'Membership renewed successfully.',
        currentPeriodStart: periodStart,
        currentPeriodEnd: periodEnd,
      });
    } catch (error) {
      console.error('Membership renewal error:', error);

      return res.status(500).json({
        success: false,
        message: 'Unable to renew membership.',
      });
    }
  }
);

// ========================================
// RECORD CANCELLATION REQUEST - ADMIN ONLY
// ========================================

router.post(
  '/:memberId/cancel',
  authenticateToken,
  requireRole('admin'),
  async (req, res) => {
    try {
      if (!isValidObjectId(req.params.memberId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid member ID.',
        });
      }

      const database = getDatabase();
      const members = database.collection('members');
      const memberId = new ObjectId(req.params.memberId);
      const member = await members.findOne({
        _id: memberId,
      });

      if (!member) {
        return res.status(404).json({
          success: false,
          message: 'Member not found.',
        });
      }

      if (
        member.subscription?.status !== 'active' ||
        member.subscription?.cancellationRequestedAt
      ) {
        return res.status(409).json({
          success: false,
          message: 'Only an active membership without an existing cancellation request can be cancelled.',
        });
      }

      const requestedAt = new Date();
      const noticeDate = addCalendarMonth(requestedAt);
      const paidThrough = member.subscription.currentPeriodEnd
        ? new Date(member.subscription.currentPeriodEnd)
        : noticeDate;
      const effectiveAt = paidThrough > noticeDate ? paidThrough : noticeDate;

      await members.updateOne(
        {
          _id: memberId,
          'subscription.status': 'active',
          'subscription.cancellationRequestedAt': null,
        },
        {
          $set: {
            'subscription.status': 'cancellation_scheduled',
            'subscription.cancellationRequestedAt': requestedAt,
            'subscription.cancellationEffectiveAt': effectiveAt,
            'subscription.automaticBillingEnabled': false,
            updatedAt: requestedAt,
          },
        }
      );

      return res.json({
        success: true,
        message: 'Cancellation request recorded. Membership remains active until its effective date.',
        cancellationRequestedAt: requestedAt,
        cancellationEffectiveAt: effectiveAt,
      });
    } catch (error) {
      console.error('Membership cancellation error:', error);

      return res.status(500).json({
        success: false,
        message: 'Unable to record cancellation request.',
      });
    }
  }
);

module.exports = router;
