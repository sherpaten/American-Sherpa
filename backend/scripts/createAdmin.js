
require('dotenv').config();

const readline = require('readline');
const bcrypt = require('bcryptjs');

const {
  connectDatabase,
  getDatabase,
} = require('../src/config/database');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

function askPassword(question) {
  return new Promise((resolve) => {
    const stdin = process.stdin;

    process.stdout.write(question);

    let password = '';

    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding('utf8');

    function onData(char) {
      if (char === '\u0003') {
        process.stdout.write('\n');
        process.exit(1);
      }

      if (char === '\r' || char === '\n') {
        stdin.setRawMode(false);
        stdin.pause();
        stdin.removeListener('data', onData);
        process.stdout.write('\n');
        resolve(password);
        return;
      }

      if (char === '\u0008' || char === '\u007f') {
        password = password.slice(0, -1);
        return;
      }

      password += char;
    }

    stdin.on('data', onData);
  });
}

async function createAdmin() {
  try {
    console.log('\n=== RipTides First Admin Setup ===\n');

    await connectDatabase();

    const database = getDatabase();
    const users = database.collection('users');

    await users.createIndex(
      { email: 1 },
      { unique: true }
    );

    const existingAdmin = await users.findOne({
      role: 'admin',
    });

    if (existingAdmin) {
      console.log('An Admin account already exists.');
      console.log('Use the Admin dashboard to manage accounts.');
      process.exit(0);
    }

    const name = (await ask('Admin name: ')).trim();
    const email = (await ask('Admin email: '))
      .trim()
      .toLowerCase();

    const password = await askPassword('Admin password: ');
    const confirmPassword = await askPassword('Confirm password: ');

    if (!name || !email || !email.includes('@')) {
      throw new Error('Please enter a valid name and email.');
    }

    if (password.length < 12) {
      throw new Error('Password must be at least 12 characters.');
    }

    if (password !== confirmPassword) {
      throw new Error('Passwords do not match.');
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await users.insertOne({
      name,
      email,
      passwordHash,
      role: 'admin',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log('\nAdmin account created successfully.');
    console.log(`Admin email: ${email}`);
    console.log('You can now use the login API.');

    process.exit(0);

  } catch (error) {
    console.error('\nAdmin setup failed:', error.message);
    process.exit(1);
  }
}

createAdmin();
