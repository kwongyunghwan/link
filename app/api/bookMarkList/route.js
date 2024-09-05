
import { connectToDatabase } from '../../../lib/mongo';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const bookMarkId = searchParams.get('bookMarkId');
    const {db} = await connectToDatabase();
    try {
      const result = await db.collection('data').find({ bookMarkId: bookMarkId }).toArray();
      
      return new Response(JSON.stringify(result), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      return new Response(JSON.stringify({ success: false, error: '데이터를 불러오는 중 오류가 발생했습니다.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
}