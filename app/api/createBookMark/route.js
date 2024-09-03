import { connectToDatabase } from '../../../lib/mongo';

export async function POST(req, res) {
  
    const { db } = await connectToDatabase();
  
    try {
        const { linkURL, linkName, linkImage, bookMarkId } = await req.json();
      // MongoDB에 데이터 삽입
      await db.collection('data').insertOne({
        linkURL,
        linkName,
        linkImage,
        bookMarkId,
        createdAt: new Date()
     });
  
     return new Response(JSON.stringify({ success: true, message: '성공적으로 북마크를 생성했습니다.' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error inserting data:', error);
    return new Response(JSON.stringify({ success: false, error: '북마크 생성 도중 오류가 발생했습니다.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}