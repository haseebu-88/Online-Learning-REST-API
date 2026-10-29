// Small persistent JSON database for a classroom demonstration.
// The assignment does not explicitly require MongoDB.
const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '..', 'data', 'db.json');
function readDb() {
  if (!fs.existsSync(dbPath)) return { users: [], categories: [], courses: [] };
  const parsed = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  return { users: parsed.users || [], categories: parsed.categories || [], courses: parsed.courses || [] };
}
function writeDb(data) {
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
  // Using a temporary file reduces risk of partial writes for this single-process demo.
  fs.writeFileSync(dbPath + '.tmp', JSON.stringify(data, null, 2));
  fs.renameSync(dbPath + '.tmp', dbPath);
}
function makeId() { return require('crypto').randomUUID(); }
module.exports = { readDb, writeDb, makeId };
