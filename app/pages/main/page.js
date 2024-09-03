'use client';
import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import { useSelector } from 'react-redux';

export default function main() {
  const [linkData, setLinkData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const id = useSelector((state) => state.userInput.inputValue);
  console.log("id>>>>>",id);
  useEffect(() => {
    const readBookMark = async () => {
      try {
        const res = await fetch(`/api/bookMarkList?id=${id}`);
        if(!res.ok){
          throw new Error("불러오기 실패");
        }
        const data = await res.json();
        setLinkData(data);
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
              </div>
            )
          })
        }
        <div className="plus_link_layout" onClick={()=>{setModalOpen(true);}}>
          <img src="/link_plus.png" className ="link_image"/> 
        </div>
        <Modal id={id} isOpen={isModalOpen} onClose={()=>{setModalOpen(false);}}>
        </Modal>

        <p className="down_bar">by kwon gyung hwan</p>
      </div>
  )
}