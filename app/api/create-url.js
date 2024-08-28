import { connectToDatabase } from '../lib/mongo';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).end(); // Method Not Allowed
    }
  
    const { client, db } = await connectToDatabase();
  
    try {
      const { data } = req.body;
  
      // MongoDB에 데이터 삽입
      await db.collection('data').insertOne({ data });
  
      return res.status(201).json({ success: true, message: 'Data inserted successfully' });
    } catch (error) {
      console.error('Error inserting data:', error);
      return res.status(500).json({ success: false, error: 'Internal Server Error' });
    } finally {
      client.close();
    }
  }