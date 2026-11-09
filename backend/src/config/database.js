const dns = require('node:dns');

dns.setServers(['1.1.1.1', '8.8.8.8']);

const { MongoClient } = require('mongodb');

let client;
let database;

async function connectDatabase() {
  try {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      throw new Error('MONGODB_URI is missing from environment variables.');
    }

    client = new MongoClient(uri);

    await client.connect();

    database = client.db('riptides_membership');

    const members = database.collection('members');
    const users = database.collection('users');

    await Promise.all([
      members.createIndex(
        { membershipId: 1 },
        { unique: true }
      ),
      members.createIndex(
        { email: 1 },
        { unique: true }
      ),
      members.createIndex(
        { status: 1, createdAt: -1 }
      ),
      users.createIndex(
        { email: 1 },
        { unique: true }
      ),
    ]);

    await database.command({ ping: 1 });

    console.log('MongoDB connected successfully.');

    return database;
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    throw error;
  }
}

async function closeDatabase() {
  if (client) {
    await client.close();
    client = null;
    database = null;
  }
}

function getDatabase() {
  if (!database) {
    throw new Error('Database has not been connected yet.');
  }

  return database;
}

module.exports = {
  connectDatabase,
  getDatabase,
  closeDatabase,
};
