const jwt = require('jsonwebtoken');

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;

  if (!secret || Buffer.byteLength(secret) < 32) {
    throw new Error('JWT_SECRET must be at least 32 bytes long.');
  }

  return secret;
}

function createAccessToken(user) {
  return jwt.sign(
    { role: user.role },
    getJwtSecret(),
    {
      subject: user._id.toString(),
      expiresIn: '8h',
      issuer: 'riptides-membership-api',
      audience: 'riptides-membership-dashboard',
    }
  );
}

module.exports = {
  createAccessToken,
  getJwtSecret,
};
