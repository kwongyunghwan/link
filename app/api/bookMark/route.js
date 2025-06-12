
import { connectToDatabase } from '../../../lib/mongo';
import { successResponse, errorResponse } from '@/lib/apiResponse';

const {db} = await connectToDatabase();

// 이미지 파일 삭제 함수
async function deleteImageFile(imagePath) {
  
  try {
    const fs = await import('fs/promises');
    const filePath = `./public${imagePath}`;
    await fs.unlink(filePath);
    console.log(`파일 삭제됨: ${filePath}`);
  } catch (error) {
    console.log(`파일 삭제 실패 (파일이 없을 수 있음): ${imagePath}`);
  }
}
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
export async function POST(req){
  try{
    const formData = await req.formData();
    let body = {
              itemId: formData.get('itemId'),
              linkURL: formData.get('linkURL'),
              linkName: formData.get('linkName'),
              bookMarkId: formData.get('bookMarkId')
        };
    const file = formData.get('linkImage');
            if (file && file.size > 0) {
                // 파일을 public/uploads 폴더에 저장
                const fileName = `${Date.now()}_${file.name}`;
                const filePath = `./public/uploads/${fileName}`;
                
                // 파일 저장 (실제 구현에서는 fs 모듈 사용)
                const buffer = await file.arrayBuffer();
                const fs = await import('fs/promises');
                
                // uploads 폴더가 없으면 생성
                try {
                    await fs.access('./public/uploads');
                } catch {
                    await fs.mkdir('./public/uploads', { recursive: true });
                }
                
                await fs.writeFile(filePath, Buffer.from(buffer));
                body.linkImage = `/uploads/${fileName}`; // 저장된 파일 경로
            } else {
                body.linkImage = '';
            }
    await db.collection('data').insertOne({
      ...body,
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
    const formData = await req.formData();
    let body = {
              itemId: formData.get('itemId'),
              linkURL: formData.get('linkURL'),
              linkName: formData.get('linkName'),
              bookMarkId: formData.get('bookMarkId')
        };
    
    const file = formData.get('linkImage');
    if (file && file.size > 0) {
        // 기존 이미지 정보 가져오기 (삭제를 위해)
        const existingData = await db.collection('data').findOne({itemId: body.itemId});
        
        // 새 파일 업로드
        const fileName = `${Date.now()}_${file.name}`;
        const filePath = `./public/uploads/${fileName}`;
        
        const buffer = await file.arrayBuffer();
        const fs = await import('fs/promises');
        
        try {
            await fs.access('./public/uploads');
        } catch {
            await fs.mkdir('./public/uploads', { recursive: true });
        }
        
        await fs.writeFile(filePath, Buffer.from(buffer));
        body.linkImage = `/uploads/${fileName}`;
        
        // 기존 이미지 파일 삭제
        await deleteImageFile(existingData?.linkImage);
    }
    // 파일이 없으면 linkImage를 body에서 제거 (기존 이미지 유지)
    else {
        delete body.linkImage;
    }
    
    await db.collection('data').updateOne(
      {itemId: body.itemId},
      {$set:{ ...body, updatedAt: new Date()}}
    );
    
    return successResponse({ message: '성공적으로 북마크를 수정했습니다.' }, 200);
  }catch(error){
    console.error('Error updating data:', error);
    return errorResponse('북마크 수정 도중 오류가 발생했습니다', 500);
  }
}

// DELETE 북마크 삭제
export async function DELETE(req){
  try{
    const {itemId, bookMarkId} = await req.json();
    
    // 삭제하기 전에 이미지 파일 정보 가져오기
    const existingData = await db.collection('data').findOne({itemId, bookMarkId});
    
    await db.collection('data').deleteOne({
      itemId,
      bookMarkId
    });

    // 이미지 파일도 삭제
    await deleteImageFile(existingData?.linkImage);

    return successResponse({ message: '성공적으로 북마크를 삭제했습니다.' }, 200);
  }catch(error){
    console.error('Error deleting data:', error);
    return errorResponse('북마크 삭제 도중 오류가 발생했습니다.', 500);
  }
}