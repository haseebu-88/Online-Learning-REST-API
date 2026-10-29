const { readDb, writeDb, makeId } = require('./db');
const Course = {
  all() { return readDb().courses; },
  findById(id) { return readDb().courses.find(c => c.id === id) || null; },
  create(data) {
    const db = readDb();
    const course = { id: makeId(), ...data, createdAt: new Date().toISOString() };
    db.courses.push(course);
    writeDb(db);
    return course;
  },
  update(id, updates) {
    const db = readDb();
    const course = db.courses.find(c => c.id === id);
    if (!course) return null;
    Object.assign(course, updates);
    writeDb(db);
    return course;
  },
  remove(id) {
    const db = readDb();
    const found = db.courses.find(c => c.id === id);
    if (!found) return null;
    db.courses = db.courses.filter(c => c.id !== id);
    writeDb(db);
    return found;
  }
};
module.exports = Course;
