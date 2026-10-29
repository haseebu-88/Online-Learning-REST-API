const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const validEmail = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body || {};
    if (typeof name !== 'string' || !name.trim() || typeof email !== 'string' || !validEmail(email.trim()) || typeof password !== 'string' || password.length < 6) {
      return res.status(400).json({ success: false, message: 'name, valid email and password (min 6 characters) are required' });
    }
    const normalizedEmail = email.trim().toLowerCase();
    if (User.findByEmail(normalizedEmail)) return res.status(409).json({ success: false, message: 'Email already registered' });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = User.create({ name: name.trim(), email: normalizedEmail, passwordHash });
    return res.status(201).json({ success: true, message: 'User registered successfully', user });
  } catch (err) { next(err); }
};
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    if (typeof email !== 'string' || !email.trim() || typeof password !== 'string' || !password) {
      return res.status(400).json({ success: false, message: 'email and password are required' });
    }
    const user = User.findByEmail(email.trim().toLowerCase());
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ success: true, message: 'Login successful', token, tokenType: 'Bearer' });
  } catch (err) { next(err); }
};
