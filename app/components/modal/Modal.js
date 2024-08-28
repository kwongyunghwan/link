import React, { useState } from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

const [linkURL, setlinkURL] = useState('');
const [linkID, setlinkID] = useState('');

const handleSubmit = (event) =>{
  event.preventDefault();
  console.log('submit values:', {linkURL, linkID});
}
  return (
    <div className="modal-overlay">
      <div className="modal">
          <form onSubmit = {handleSubmit}>
          <div className="close_button"><button onClick={onClose}>닫기</button></div>
          <div className='modal_title'>북마크</div>
        <p>북마크할 링크를 작성해 주세요.</p>
            <label>
              <div className='modal_sub'>URL</div> 
              <input className='modal_input' type = "text" value={linkURL} onChange={(e)=> setlinkURL(e.target.value)}/>
            </label>
            <label>
            <div className='modal_sub'>Name</div> <input className='modal_input' type = "text" value={linkID} onChange={(e)=> setlinkID(e.target.value)}/>
            </label>
            <div className='submit_button'><button type="submit">등록</button></div>
          </form>
        {children}
      </div>
    </div>
  );
};

export default Modal;