import { connectToDatabase } from "@/lib/mongo";

export async function POST(req){
    const { db } = await connectToDatabase();
    
    try{
        const { linkURL, linkName, bookMarkId } = await req.json();
        await db.collection('data').deleteOne({
            linkURL,
            linkName,
            bookMarkId
         });
        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          });
    }catch(error){
        console.error('Error fetching data:', error);
        return new Response(JSON.stringify({ success: false, error: '데이터를 불러오는 중 오류가 발생했습니다.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}