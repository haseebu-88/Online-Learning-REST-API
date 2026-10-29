const Category = require('../models/Category');
exports.create = (req, res) => {
  const { name, description = '' } = req.body || {};
  if (typeof name !== 'string' || !name.trim()) return res.status(400).json({ success: false, message: 'Category name is required' });
  if (typeof description !== 'string') return res.status(400).json({ success: false, message: 'Description must be text' });
  if (Category.nameExists(name.trim())) return res.status(409).json({ success: false, message: 'Category name already exists' });
  const category = Category.create({ name: name.trim(), description: description.trim() });
  return res.status(201).json({ success: true, message: 'Category created', category });
};
exports.list = (req, res) => res.status(200).json({ success: true, categories: Category.all() });
exports.getOne = (req, res) => {
  const category = Category.findById(req.params.id);
  if (!category) return res.status(404).json({ success: false, message: 'Category not found' });
  return res.status(200).json({ success: true, category });
};
exports.update = (req, res) => {
  if (!Category.findById(req.params.id)) return res.status(404).json({ success: false, message: 'Category not found' });
  const { name, description } = req.body || {};
  if (name === undefined && description === undefined) return res.status(400).json({ success: false, message: 'At least one field is required' });
  if (name !== undefined && (typeof name !== 'string' || !name.trim())) return res.status(400).json({ success: false, message: 'Category name cannot be empty' });
  if (description !== undefined && typeof description !== 'string') return res.status(400).json({ success: false, message: 'Description must be text' });
  if (name !== undefined && Category.nameExists(name.trim(), req.params.id)) return res.status(409).json({ success: false, message: 'Category name already exists' });
  const updates = {};
  if (name !== undefined) updates.name = name.trim();
  if (description !== undefined) updates.description = description.trim();
  return res.status(200).json({ success: true, message: 'Category updated', category: Category.update(req.params.id, updates) });
};
exports.remove = (req, res) => {
  const result = Category.remove(req.params.id);
  if (!result) return res.status(404).json({ success: false, message: 'Category not found' });
  if (result.blocked) return res.status(400).json({ success: false, message: 'Delete linked courses first' });
  return res.status(200).json({ success: true, message: 'Category deleted' });
};
