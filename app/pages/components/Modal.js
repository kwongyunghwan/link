import React, { useState } from 'react';
import '../../styles/module.css'

const Modal = ({ bookMarkId, isOpen, onClose }) => {
  if (!isOpen) return null;

const [linkURL, setlinkURL] = useState('');
const [linkName, setlinkName] = useState('');
const [linkImage, setlinkImage] = useState('');

const InsertBookMark = async(e) =>{
  e.preventDefault();
  try{
    const res = await fetch('/api/createBookMark',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        linkURL: linkURL.startsWith("http") ? linkURL : "http://" + linkURL,
        linkName: linkName,
        linkImage: linkImage,
        bookMarkId: bookMarkId,
      })
    });
    console.log("생성 완료",'submit values:', {linkURL, linkName,linkImage,bookMarkId});
    onClose();
  }catch(error){
    console.error("생성 오류", error)
  }
}
  return (
    <div className="modal-overlay">
      <div className="modal">
          <form onSubmit = {InsertBookMark}>
            <div className="close_button"><button onClick={onClose}>닫기</button></div>
            <div className='modal_title'>북마크</div>
            <p>북마크할 링크를 작성해 주세요.</p>
                <div className='modal_sub'>URL<input className='modal_input' type = "text" value={linkURL} onChange={(e)=> setlinkURL(e.target.value)}/></div>
                <div className='modal_sub'>Name <input className='modal_input' type = "text" value={linkName} onChange={(e)=> setlinkName(e.target.value)}/></div>
                <div className='modal_sub'>이미지 <input className='modal_input' type = "file" value={linkImage} onChange={(e)=> setlinkImage(e.target.value)}/></div>
                <div className='submit_button'><button type="submit">추가</button></div>
          </form>
      </div>
    </div>
  );
};

export default Modal;