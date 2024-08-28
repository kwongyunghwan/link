import Link from "next/link";
import Modal from '../modal';
import { connectToDatabase } from '../../../lib/mongo';


export default async function main() {
  const { client, db } = await connectToDatabase();
  const result = await db.collection('data').find().toArray();

  return (
      <div>
        <div className="title"><Link href="/"><img src="/title.png" className ="title_image"/></Link></div>
        {
          result.map((e,index)=>{
            return(
              <div key ={index} className="link_layout">
              <img src="/favicon.ico" className ="link_image"/><a target="_blank" href={e.link_url}>{e.link_name}</a>
              </div>
            )
          })
        }
        <div className="plus_link_layout">
          <img src="/link_plus.png" className ="link_image"/> 
        </div>

        <p className="down_bar">by kwon gyung hwan</p>
      </div>
  )
}
// import Link from "next/link";
// import { connectToDatabase } from '../../../lib/mongo';


// export default async function main() {
//   const { client, db } = await connectToDatabase();
//   const result = await db.collection('data').find().toArray();

//   return (
//       <div>
//         <div className="title"><Link href="/"><img src="/title.png" className ="title_image"/></Link></div>
//         {
//           result.map((e,index)=>{
//             return(
//               <div key ={index} className="link_layout">
//               <img src="/favicon.ico" className ="link_image"/><a target="_blank" href={e.link_url}>{e.link_name}</a>
//               </div>
//             )
//           })
//         }
//         <div className="plus_link_layout">
//           <img src="/link_plus.png" className ="link_image"/> 
//         </div>

//         <p className="down_bar">by kwon gyung hwan</p>
//       </div>
//   )
// }