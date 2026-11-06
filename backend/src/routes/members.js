
const express = require('express');
const crypto = require('node:crypto');
const { getDatabase } = require('../config/database');

const router = express.Router();

// Register a new member
router.post('/register', async (req, res) => {
  try {
    const { fullName, email, phone } = req.body;

    if (!fullName || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Full name, email and phone are required.',
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const database = getDatabase();
    const members = database.collection('members');

    // Check whether this email is already registered
    const existingMember = await members.findOne({
      email: normalizedEmail,
    });

    if (existingMember) {
      return res.status(409).json({
        success: false,
        message: 'A member with this email already exists.',
      });
    }

    const membershipId = `RT-${new Date().getFullYear()}-${crypto
      .randomBytes(4)
      .toString('hex')
      .toUpperCase()}`;

    const member = {
      membershipId,
      fullName: fullName.trim(),
      email: normalizedEmail,
      phone: phone.trim(),
      startDate: null,
      expiryDate: null,
      status: 'pending',
      paymentStatus: 'pending',
      paymentMethod: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await members.insertOne(member);

    return res.status(201).json({
      success: true,
      message: 'Membership registration submitted successfully.',
      member: {
        membershipId: member.membershipId,
        fullName: member.fullName,
        email: member.email,
        status: member.status,
        paymentStatus: member.paymentStatus,
      },
    });
  } catch (error) {
    console.error('Member registration error:', error);

    return res.status(500).json({
      success: false,
      message: 'Unable to register member.',
    });
  }
});

module.exports = router;
