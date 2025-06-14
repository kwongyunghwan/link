'use client';
import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import { useSelector } from 'react-redux';

export default function main() {
  const [linkData, setLinkData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const bookMarkId = useSelector((state) => state.userInput.inputValue);
  const [selectedItemId, setSelectedItemId] = useState("");
  
  const copyBookMark = async() =>{
    navigator.clipboard.writeText(bookMarkId);
    alert(`북마크 코드가 복사되었습니다.(${bookMarkId})`);
  };

  const deleteBookMark = async ({itemId, bookMarkId}) => {
    try {
      const res = await fetch('/api/bookMark', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId, bookMarkId })
      });

      if(!res.ok){
        throw new Error("삭제 실패");
      }
      const result = await res.json();
      if (result.success) {
        alert('북마크가 성공적으로 삭제되었습니다.');
      } else {
        alert('북마크 삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('삭제 오류:', error);
    }
  };
  
  useEffect(() => {
    const readBookMark = async () => {
      try {
        const res = await fetch(`/api/bookMark?bookMarkId=${bookMarkId}`);
        if(!res.ok){
          throw new Error("불러오기 실패"); 
        }
        const data = await res.json();
        setLinkData(data.data);
        console.log(data.data);
      } catch (error) {
        console.error('불러오기 오류 :', error);
      }
    };

    readBookMark();
  }, [linkData]);


  return (
      <div>
        <div className="des_container">북마크 코드 : {bookMarkId}</div>
        <div className="plus_link_layout" onClick={()=>{setModalOpen(true);setSelectedItemId('')}}>
          <img src="/link_plus.png" className ="link_image"/> 
        </div>
        {
          linkData.map((e,index)=>{
            return(
              <div key ={index} className="link_layout">
              {e.linkImage && <img src={e.linkImage} className="link_image" onError={(e) => e.target.style.display = 'none'} />}<a target="_blank" href={e.linkURL}>{e.linkName}</a>
                     <img src="/delete.png" className="link_delete_image" onClick={()=>deleteBookMark({itemId: e.itemId, bookMarkId})}/>
              <img src="/update.png" className="link_delete_image" onClick={()=>{setModalOpen(true);setSelectedItemId(e.itemId);}}/>
              </div>
            )
          })
        }
        <Modal key={selectedItemId || 'new'} bookMarkId={bookMarkId} itemId={selectedItemId} isOpen={isModalOpen} onClose={()=>{setModalOpen(false);}}>
        </Modal>
        <div><button className="copy_button" onClick={()=>copyBookMark()}>북마크 코드 복사</button></div>
        <p className="down_bar">by kwon gyung hwan</p>
      </div>
  )
}