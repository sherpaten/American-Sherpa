require('dotenv').config();

const readline = require('readline');
const bcrypt = require('bcryptjs');
const { connectDatabase, getDatabase } = require('../src/config/database');

const ADMINS = [
  { name: 'Dawa Sherpa', email: 'dawa@americansherpatours.com', title: 'General Manager' },
  { name: 'Chongba Sherpa', email: 'riptides@americansherpatours.com', title: 'Owner' },
  { name: 'Tenzing Sherpa', email: 'cretostudio115@gmail.com', title: 'General Manager' },
];

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
function ask(question) { return new Promise((resolve) => rl.question(question, resolve)); }

function askPassword(question) {
  return new Promise((resolve, reject) => {
    const stdin = process.stdin;
    if (!stdin.isTTY || typeof stdin.setRawMode !== 'function') {
      reject(new Error('Run this script in an interactive terminal so passwords are not echoed.'));
      return;
    }
    process.stdout.write(question);
    let password = '';
    stdin.setRawMode(true); stdin.resume(); stdin.setEncoding('utf8');
    function onData(char) {
      if (char === '\u0003') { stdin.setRawMode(false); process.stdout.write('\n'); stdin.removeListener('data', onData); reject(new Error('Setup cancelled.')); return; }
      if (char === '\r' || char === '\n') { stdin.setRawMode(false); stdin.pause(); stdin.removeListener('data', onData); process.stdout.write('\n'); resolve(password); return; }
      if (char === '\u0008' || char === '\u007f') { password = password.slice(0, -1); return; }
      password += char;
    }
    stdin.on('data', onData);
  });
}

async function main() {
  try {
    console.log('\n=== RipTides three-administrator setup ===\n');
    console.log('Creates only the three approved accounts. Passwords are entered privately and never printed.\n');
    await connectDatabase();
    const users = getDatabase().collection('users');
    const existingCount = await users.countDocuments({});
    if (existingCount !== 0) throw new Error('Safety stop: users collection contains ' + existingCount + ' document(s). No accounts were created. Review the collection first.');
    await users.createIndex({ email: 1 }, { unique: true });
    const records = [];
    for (const admin of ADMINS) {
      console.log(admin.name + ' — ' + admin.title);
      console.log('Email: ' + admin.email);
      const password = await askPassword('Set initial password (minimum 12 characters): ');
      const confirm = await askPassword('Confirm initial password: ');
      if (password.length < 12) throw new Error('Password for ' + admin.email + ' must be at least 12 characters.');
      if (password !== confirm) throw new Error('Passwords for ' + admin.email + ' do not match.');
      records.push({ name: admin.name, email: admin.email, jobTitle: admin.title, passwordHash: await bcrypt.hash(password, 12), role: 'admin', isActive: true, createdAt: new Date(), updatedAt: new Date() });
      console.log('Password accepted.\n');
    }
    const result = await users.insertMany(records, { ordered: true });
    console.log('Success: created ' + result.insertedCount + ' administrator accounts.');
    for (const admin of ADMINS) console.log('- ' + admin.name + ' (' + admin.email + ') — ' + admin.title);
    console.log('\nNo passwords or password hashes were displayed.');
    process.exitCode = 0;
  } catch (error) {
    console.error('\nAdmin setup stopped:', error.message);
    process.exitCode = 1;
  } finally {
    rl.close();
    const dbModule = require('../src/config/database');
    if (typeof dbModule.closeDatabase === 'function') await dbModule.closeDatabase();
  }
}

main();