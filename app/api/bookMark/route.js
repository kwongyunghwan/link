
import { connectToDatabase } from '../../../lib/mongo';
import { successResponse, errorResponse } from '@/lib/apiResponse';

const {db} = await connectToDatabase();

// READ 북마크 가져오기
export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const bookMarkId = searchParams.get('bookMarkId');
    const itemId = searchParams.get('itemId');
    let result = '';
    try {
      if(itemId){
        result = await db.collection('data').findOne({ itemId: itemId });
      }else if(bookMarkId){
        result = await db.collection('data').find({ bookMarkId: bookMarkId }).toArray();
      }
      return successResponse(result, 200);

    } catch (error) {
      console.error('Error fetching data:', error);
      return errorResponse('데이터를 불러오는 도중 오류가 발생했습니다', 500);
    }
}

// CREATE 북마크 생성
export async function POST(req){

  try{
    const { itemId, linkURL, linkName, linkImage, bookMarkId } = await req.json();
    
    await db.collection('data').insertOne({
      itemId,
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
    const {itemId, linkURL, linkName, bookMarkId} = await req.json();
    await db.collection('data').updateOne({itemId: itemId},
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
    const {itemId, bookMarkId} = await req.json();
    await db.collection('data').deleteOne({
      itemId,
      bookMarkId
    });

    return successResponse({ message: '성공적으로 북마크를 삭제했습니다.' }, 200);
  }catch(error){
    console.error('Error fetching data:', error);
    return errorResponse('북마크 삭제 도중 오류가 발생했습니다.', 500);
  }
}