require('dotenv').config();
const express = require('express');
const cors = require('cors');
if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 20 || process.env.JWT_SECRET.startsWith('REPLACE_THIS')) {
  throw new Error('Set a strong JWT_SECRET in .env (at least 20 characters)');
}
const app = express();
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => res.status(200).json({ success: true, message: 'Online Learning REST API is running successfully' }));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));
app.use((req, res) => res.status(404).json({ success: false, message: 'Route not found' }));
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) return res.status(400).json({ success: false, message: 'Invalid JSON body' });
  console.error(err);
  return res.status(500).json({ success: false, message: 'Internal server error' });
});
const PORT = Number(process.env.PORT || 5000);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
