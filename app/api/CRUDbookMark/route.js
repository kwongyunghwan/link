
import { connectToDatabase } from '../../../lib/mongo';
import { successResponse, errorResponse } from '@/lib/apiResponse';

const {db} = await connectToDatabase();

// READ 북마크 가져오기
export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const bookMarkId = searchParams.get('bookMarkId');
    
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

  try{
    const { itemID, linkURL, linkName, linkImage, bookMarkId } = await req.json();
    
    await db.collection('data').insertOne({
      itemID,
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
  try{
    const {itemID, linkURL, linkName, bookMarkId} = await req.json();
    await db.collection('data').updateOne({itemID: itemID},
      {
        $set:{
        linkURL : linkURL,
        linkName : linkName,
        bookMarkId : bookMarkId
      }
    });
    return successResponse({ message: '성공적으로 북마크를 수정했습니다.' }, 200);
  }catch(error){
    console.error('Error fetching data: error');
    return errorResponse('북마크 수정 도중 오류가 발생했습니다', 500);
  }
}

// DELETE 북마크 삭제
export async function DELETE(req){

  try{
    const {itemID, bookMarkId} = await req.json();
    await db.collection('data').deleteOne({
      itemID,
      bookMarkId
    });

    return successResponse({ message: '성공적으로 북마크를 삭제했습니다.' }, 200);
  }catch(error){
    console.error('Error fetching data:', error);
    return errorResponse('북마크 삭제 도중 오류가 발생했습니다.', 500);
  }
}