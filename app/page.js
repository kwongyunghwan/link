'use client'
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Link from "next/link";
import './styles/module.css';
import { useDispatch } from 'react-redux';
import { setInputValue } from './store/userInputSlice';
export default function Home() {
  const dispatch = useDispatch();
  const [id, setId] = useState('');
  
  return (
    <div>
    <div className='des_container'>
      <span>이전에 생성한 북마크가 있다면 <span className='bold'>북마크 코드</span>를 입력해 주세요.</span>
      <span>생성한 북마크가 없다면 <span className='bold'>'새로 생성'</span> 버튼을 눌러주세요.</span>
    </div>
    <div className='title_sub'><h3>북마크 코드</h3></div>
    <div className='title_sub'><input className='modal_input' type="text" value={id} onChange={(e)=>{setId(e.target.value);}}/>
    <Link href="/pages/main">
      <button className='joinButton' onClick={()=>{ dispatch(setInputValue(id))}}>접속</button>
    </Link>
    <div className='title'><Link href="/pages/main">
      <button className='createButton' onClick={()=>{ dispatch(setInputValue(uuidv4()))}}>새로 생성</button>
    </Link></div>
    </div>
  </div>
  )
}
