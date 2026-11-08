
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');

const { getDatabase } = require('../config/database');
const { getJwtSecret } = require('../utils/tokens');

async function authenticateToken(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required.',
    });
  }

  const token = authorization.slice(7);

  try {
    const payload = jwt.verify(token, getJwtSecret(), {
      issuer: 'riptides-membership-api',
      audience: 'riptides-membership-dashboard',
    });

    if (!payload.sub || !ObjectId.isValid(payload.sub)) {
      return res.status(401).json({
        success: false,
        message: 'Invalid authentication token.',
      });
    }

    const database = getDatabase();
    const users = database.collection('users');

    // Always check the latest account status and role.
    const user = await users.findOne({
      _id: new ObjectId(payload.sub),
    });

    if (!user || user.isActive !== true) {
      return res.status(401).json({
        success: false,
        message: 'Account is inactive or no longer exists.',
      });
    }

    if (!['admin', 'staff'].includes(user.role)) {
      return res.status(403).json({
        success: false,
        message: 'This account does not have dashboard access.',
      });
    }

    req.user = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError' ||
        error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired login session.',
      });
    }

    console.error('Authentication error:', error);

    return res.status(500).json({
      success: false,
      message: 'Unable to verify authentication.',
    });
  }
}

function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to perform this action.',
      });
    }

    next();
  };
}

module.exports = {
  authenticateToken,
  requireRole,
};
