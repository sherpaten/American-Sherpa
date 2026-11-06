
const express = require('express');
const bcrypt = require('bcryptjs');
const { rateLimit } = require('express-rate-limit');

const { getDatabase } = require('../config/database');
const { createAccessToken } = require('../utils/tokens');

const {
  authenticateToken,
  requireRole,
} = require('../middleware/auth');

const router = express.Router();

// ========================================
// LOGIN RATE LIMIT
// ========================================

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many login attempts. Please try again later.',
  },
});

// ========================================
// ADMIN & STAFF LOGIN
// ========================================

router.post('/login', loginLimiter, async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.',
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const database = getDatabase();
    const users = database.collection('users');

    const user = await users.findOne({
      email: normalizedEmail,
    });

    if (!user || user.isActive !== true) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    const passwordMatches = await bcrypt.compare(
      password,
      user.passwordHash
    );

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    if (!['admin', 'staff'].includes(user.role)) {
      return res.status(403).json({
        success: false,
        message: 'This account does not have dashboard access.',
      });
    }

    const token = createAccessToken(user);

    await users.updateOne(
      { _id: user._id },
      {
        $set: {
          lastLoginAt: new Date(),
        },
      }
    );

    return res.json({
      success: true,
      message: 'Login successful.',
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error('Login error:', error);

    return res.status(500).json({
      success: false,
      message: 'Unable to complete login.',
    });
  }
});

// ========================================
// GET CURRENT LOGGED-IN USER
// ========================================

router.get('/me', authenticateToken, (req, res) => {
  return res.json({
    success: true,
    user: req.user,
  });
});

// ========================================
// ADMIN CREATES STAFF ACCOUNT
// ========================================

router.post(
  '/staff',
  authenticateToken,
  requireRole('admin'),
  async (req, res) => {
    try {
      const { name, email, password } = req.body || {};

      if (
        typeof name !== 'string' ||
        typeof email !== 'string' ||
        typeof password !== 'string' ||
        !name.trim() ||
        !email.trim() ||
        !password
      ) {
        return res.status(400).json({
          success: false,
          message: 'Name, email and password are required.',
        });
      }

      const normalizedEmail = email.trim().toLowerCase();

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
        return res.status(400).json({
          success: false,
          message: 'Please provide a valid email address.',
        });
      }

      if (password.length < 12) {
        return res.status(400).json({
          success: false,
          message: 'Password must be at least 12 characters.',
        });
      }

      if (name.trim().length > 100) {
        return res.status(400).json({
          success: false,
          message: 'Name cannot exceed 100 characters.',
        });
      }

      const database = getDatabase();
      const users = database.collection('users');

      const existingUser = await users.findOne({
        email: normalizedEmail,
      });

      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: 'An account with this email already exists.',
        });
      }

      const passwordHash = await bcrypt.hash(password, 12);

      const newStaff = {
        name: name.trim(),
        email: normalizedEmail,
        passwordHash,
        role: 'staff',
        isActive: true,
        createdBy: req.user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = await users.insertOne(newStaff);

      return res.status(201).json({
        success: true,
        message: 'Staff account created successfully.',
        staff: {
          id: result.insertedId.toString(),
          name: newStaff.name,
          email: newStaff.email,
          role: newStaff.role,
          isActive: newStaff.isActive,
        },
      });

    } catch (error) {
      if (error.code === 11000) {
        return res.status(409).json({
          success: false,
          message: 'An account with this email already exists.',
        });
      }

      console.error('Staff creation error:', error);

      return res.status(500).json({
        success: false,
        message: 'Unable to create staff account.',
      });
    }
  }
);

module.exports = router;
