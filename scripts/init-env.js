// Creates a private local JWT secret so Windows beginners can start with one click.
// It never overwrites an existing .env file.
const fs = require('fs');
const path = require('path');
const { randomBytes } = require('crypto');
const filepath = path.join(__dirname, '..', '.env');
if (!fs.existsSync(filepath)) {
  const content = `PORT=5000\nJWT_SECRET=${randomBytes(48).toString('hex')}\n`;
  fs.writeFileSync(filepath, content, { flag: 'wx', mode: 0o600 });
  console.log('Created private .env configuration (ignored by Git).');
} else {
  console.log('Using existing .env configuration.');
}
