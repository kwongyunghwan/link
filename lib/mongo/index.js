import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

if (!dbName) {
  throw new Error('Please define the MONGODB_DB environment variable');
}

async function connectToDatabase() {

  const client = await MongoClient.connect(uri);

  const db = await client.db('link');
  
  return {client,db} ;
}

export { connectToDatabase };