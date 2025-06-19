import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

// 환경 변수 검증
if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

if (!dbName) {
  throw new Error('Please define the MONGODB_DB environment variable');
}

let client;
let clientPromise;

// 글로벌 연결 캐싱
if (!global._mongoClientPromise) {
  client = new MongoClient(uri);

  // MongoDB 클라이언트 연결 시도
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;


async function connectToDatabase() {
  if (!clientPromise) {
    clientPromise = MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
   // 연결이 준비될 때까지 기다립니다.
   const client = await clientPromise;
   const db = client.db(dbName);
   return { client, db };

}

export { connectToDatabase };