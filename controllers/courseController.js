const Course = require('../models/Course');
const Category = require('../models/Category');
function validate(input, partial = false) {
  const { title, description, categoryId, price } = input || {};
  if (!partial || title !== undefined) if (typeof title !== 'string' || !title.trim()) return 'Course title is required';
  if (!partial || categoryId !== undefined) if (typeof categoryId !== 'string' || !Category.findById(categoryId)) return 'Valid categoryId is required';
  if (description !== undefined && typeof description !== 'string') return 'Description must be text';
  if (price !== undefined && (typeof price !== 'number' || !Number.isFinite(price) || price < 0)) return 'Price must be a non-negative number';
  if (partial && title === undefined && description === undefined && categoryId === undefined && price === undefined) return 'At least one field is required';
  return null;
}
exports.create = (req, res) => {
  const error = validate(req.body);
  if (error) return res.status(400).json({ success: false, message: error });
  const { title, description = '', categoryId, price = 0 } = req.body;
  const course = Course.create({ title: title.trim(), description: description.trim(), categoryId, price });
  return res.status(201).json({ success: true, message: 'Course created', course });
};
exports.list = (req, res) => res.status(200).json({ success: true, courses: Course.all() });
exports.getOne = (req, res) => {
  const course = Course.findById(req.params.id);
  return course ? res.status(200).json({ success: true, course }) : res.status(404).json({ success: false, message: 'Course not found' });
};
exports.update = (req, res) => {
  if (!Course.findById(req.params.id)) return res.status(404).json({ success: false, message: 'Course not found' });
  const error = validate(req.body, true);
  if (error) return res.status(400).json({ success: false, message: error });
  const updates = { ...req.body };
  for (const field of Object.keys(updates)) if (!['title','description','categoryId','price'].includes(field)) delete updates[field];
  if (updates.title !== undefined) updates.title = updates.title.trim();
  if (updates.description !== undefined) updates.description = updates.description.trim();
  return res.status(200).json({ success: true, message: 'Course updated', course: Course.update(req.params.id, updates) });
};
exports.remove = (req, res) => {
  const removed = Course.remove(req.params.id);
  if (!removed) return res.status(404).json({ success: false, message: 'Course not found' });
  return res.status(200).json({ success: true, message: 'Course deleted' });
};
