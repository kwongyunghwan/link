
import { connectToDatabase } from '../../lib/mongo';

export default async function getList(req, res) {
  try{      
      const db = await connectToDatabase();
      const result = await db.collection('data').find().toArray();
      console.log(result);
      res.status(200).json(result);
  }catch(error){
    console.error(error);
    res.status(500).json({error:'데이터 불러오는데 실패했습니다.'})
  }
}