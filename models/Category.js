const { readDb, writeDb, makeId } = require('./db');
const Category = {
  all() { return readDb().categories; },
  findById(id) { return readDb().categories.find(c => c.id === id) || null; },
  nameExists(name, exceptId) {
    return readDb().categories.some(c => c.name.toLowerCase() === name.toLowerCase() && c.id !== exceptId);
  },
  create({ name, description }) {
    const db = readDb();
    const category = { id: makeId(), name, description, createdAt: new Date().toISOString() };
    db.categories.push(category);
    writeDb(db);
    return category;
  },
  update(id, updates) {
    const db = readDb();
    const category = db.categories.find(c => c.id === id);
    if (!category) return null;
    Object.assign(category, updates);
    writeDb(db);
    return category;
  },
  remove(id) {
    const db = readDb();
    const category = db.categories.find(c => c.id === id);
    if (!category) return null;
    if (db.courses.some(c => c.categoryId === id)) return { blocked: true };
    db.categories = db.categories.filter(c => c.id !== id);
    writeDb(db);
    return { removed: true };
  }
};
module.exports = Category;
