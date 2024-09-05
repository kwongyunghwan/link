'use client'
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Link from "next/link";
import './styles/module.css';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { setInputValue } from './store/userInputSlice';
export default function Home() {
  const dispatch = useDispatch();
  const [id, setId] = useState('');
  const router = useRouter(); // useRouter 훅 사용

  const joinClick = (e) => {
    e.preventDefault();
    if (!id) {
      alert('북마크 코드를 입력해 주세요.');
      return;
    } else {
      dispatch(setInputValue(id));
      router.push('/pages/main'); // 페이지 이동
    }
  };

  return (
    <div>
    <div className='des_container'>
      <span>이전에 생성한 북마크가 있다면 <span className='bold'>북마크 코드</span>를 입력해 주세요.</span>
      <span>생성한 북마크가 없다면 <span className='bold'>'새로 생성'</span> 버튼을 눌러주세요.</span>
    </div>
    <div className='title_sub'><h3>북마크 코드</h3></div>
    <form className='title_sub' onSubmit={joinClick}>
        <input 
          className='modal_input' 
          type="text" 
          value={id} 
          onChange={(e) => setId(e.target.value)} 
          placeholder="북마크 코드 입력란"
          
        />
        <button type="submit" className='joinButton'>접속</button>
    </form>
    <div className='title'>
    <Link href="/pages/main">
      <button className='createButton' onClick={()=>{dispatch(setInputValue(uuidv4()))}}>새로 생성</button>
    </Link>
    </div>
  </div>
  )
}
