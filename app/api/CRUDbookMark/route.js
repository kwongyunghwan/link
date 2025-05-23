
import { connectToDatabase } from '../../../lib/mongo';
import { successResponse, errorResponse } from '@/lib/apiResponse';

// READ 북마크 가져오기
export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const bookMarkId = searchParams.get('bookMarkId');
    const {db} = await connectToDatabase();
    try {
      const result = await db.collection('data').find({ bookMarkId: bookMarkId }).toArray();
      
      return successResponse(result, 200);

    } catch (error) {
      console.error('Error fetching data:', error);
      return errorResponse('데이터를 불러오는 도중 오류가 발생했습니다', 500);
    }
}

// CREATE 북마크 생성
export async function POST(req){

  const {db} = await connectToDatabase();

  try{
    const { linkURL, linkName, linkImage, bookMarkId } = await req.json();
    
    await db.collection('data').insertOne({
      linkURL,
      linkName,
      linkImage,
      bookMarkId,
      createdAt: new Date()
    });
     return successResponse({ message: '성공적으로 북마크를 생성했습니다.' }, 200);
  } catch (error) {
    console.error('Error inserting data:', error);
    return errorResponse('북마크 생성 도중 오류가 발생했습니다', 500);
  }
}

// UPDATE 북마크 수정
export async function PATCH(req){
  const {db} = await connectToDatabase();

  try{
    const {linkURL, linkName, bookMarkId} = await req.json();
    await db.collection('data').updateOne({
      linkURL,
      linkName,
      bookMarkId
    });
    return successResponse({ message: '성공적으로 북마크를 수정했습니다.' }, 200);
  }catch(error){
    console.error('Error fetching data: error');
    return errorResponse('북마크 수정 도중 오류가 발생했습니다', 500);
  }
}

// DELETE 북마크 삭제
export async function DELETE(req){

  const {db} = await connectToDatabase();
  
  try{
    const {linkURL, linkName, bookMarkId} = await req.json();
    await db.collection('data').deleteOne({
      linkURL,
      linkName,
      bookMarkId
    });

    return successResponse({ message: '성공적으로 북마크를 삭제했습니다.' }, 200);
  }catch(error){
    console.error('Error fetching data:', error);
    return errorResponse('북마크 삭제 도중 오류가 발생했습니다.', 500);
  }
}