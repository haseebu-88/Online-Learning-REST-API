const { readDb, writeDb, makeId } = require('./db');
const User = {
  findByEmail(email) {
    return readDb().users.find(user => user.email === email.toLowerCase()) || null;
  },
  create({ name, email, passwordHash }) {
    const db = readDb();
    const user = { id: makeId(), name, email: email.toLowerCase(), passwordHash, createdAt: new Date().toISOString() };
    db.users.push(user);
    writeDb(db);
    return { id: user.id, name: user.name, email: user.email };
  }
};
module.exports = User;
