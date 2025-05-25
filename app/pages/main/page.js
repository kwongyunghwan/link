'use client';
import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import { useSelector } from 'react-redux';

export default function main() {
  const [linkData, setLinkData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const bookMarkId = useSelector((state) => state.userInput.inputValue);
  
  const deleteBookMark = async ({itemID, bookMarkId}) => {
    try {
      const res = await fetch('/api/CRUDbookMark', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemID, bookMarkId })
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
  }
  
  useEffect(() => {
    const readBookMark = async () => {
      try {
        const res = await fetch(`/api/CRUDbookMark?bookMarkId=${bookMarkId}`);
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
        {
          linkData.map((e,index)=>{
            return(
              <div key ={index} className="link_layout">
              <img src="/favicon.ico" className ="link_image"/><a target="_blank" href={e.linkURL}>{e.linkName}</a>
              <img src="/delete.png" className="link_delete_image" onClick={()=>deleteBookMark({itemID: e.itemID, bookMarkId})}/>
              
              </div>
            )
          })
        }
        <div className="plus_link_layout" onClick={()=>{setModalOpen(true);}}>
          <img src="/link_plus.png" className ="link_image"/> 
        </div>
        <Modal bookMarkId={bookMarkId} isOpen={isModalOpen} onClose={()=>{setModalOpen(false);}}>
        </Modal>

        <p className="down_bar">by kwon gyung hwan</p>
      </div>
  )
}