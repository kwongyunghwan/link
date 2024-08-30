
import { connectToDatabase } from '../../../lib/mongo';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const bookMarkId = searchParams.get('id');
    const {db} = await connectToDatabase();
    const result = await db.collection('data').find({bookMarkId:bookMarkId}).toArray();

    
    return new Response(JSON.stringify(result),{
        status:200,
        headers: {'Content-Type': 'application/json'},
  });
}