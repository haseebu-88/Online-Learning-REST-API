const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
  const authorization = req.headers.authorization || '';
  const match = authorization.match(/^Bearer (.+)$/i);
  if (!match) return res.status(401).json({ success: false, message: 'Bearer token required. Login first.' });
  try {
    req.user = jwt.verify(match[1], process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};
