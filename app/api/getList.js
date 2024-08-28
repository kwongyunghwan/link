
import { connectToDatabase } from '../../lib/mongo';

export default async function getList() {
const { client, db } = await connectToDatabase();
  const result = await db.collection('data').find().toArray();
  return result
}