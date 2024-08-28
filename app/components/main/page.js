"use client";
import Link from "next/link";
import React, { useState, useEffect } from 'react';
import Modal from '../Modal';

export default async function main() {
  const [linkData, setLinkData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/getList');
        const jsonData = await res.json();
        setLinkData(jsonData);
        console.log(setLinkData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };


  return (
      <div>
        <div className="title"><Link href="/"><img src="/title.png" className ="title_image"/></Link></div>
        {
          linkData.map((e,index)=>{
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