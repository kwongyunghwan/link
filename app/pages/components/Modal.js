import React, { useEffect,useState } from 'react';
import crypto from 'crypto';
import '../../styles/modal.css'

const Modal = ({ bookMarkId, itemId, isOpen, onClose }) => {
const [linkData, setLinkData] = useState([]);
const [linkURL, setlinkURL] = useState('');
const [linkName, setlinkName] = useState('');
const [linkImage, setlinkImage] = useState('');

useEffect(() => { 
  
  if(isOpen && itemId){
    const readBookMark = async () => {
      try {
        const res = await fetch(`/api/bookMark?itemId=${itemId}`);
        if(!res.ok){
          throw new Error("불러오기 실패");
        }
        const data = await res.json();
        const item = data.data;
        setlinkURL(item.linkURL || '');
        setlinkName(item.linkName || '');
        setlinkImage(item.linkImage || '');
      } catch (error) {
        console.error('불러오기 오류 :', error);
      }
    };
    readBookMark();
    } else {
        // 새 항목 추가 모드: 상태 초기화
        setlinkURL('');
        setlinkName('');
        setlinkImage('');
      }
  }, [isOpen, itemId]);

if (!isOpen) return null;
const InsertBookMark = async(e) =>{
  e.preventDefault(); 
  try{
    const formData = new FormData();
    formData.append('itemId', itemId ? itemId : crypto.randomBytes(4).toString('hex'));
    formData.append('linkURL', linkURL.startsWith("http") ? linkURL : "http://" + linkURL);
    formData.append('linkName', linkName);
    formData.append('bookMarkId', bookMarkId);

    const fileInput = document.querySelector('input[type="file"]');
    if(fileInput.files[0]){
      formData.append('linkImage', fileInput.files[0]);
    }else{
      formData.append('linkImage', '');
    }

    const res = await fetch('/api/bookMark',{
      method: itemId ? 'PATCH' : 'POST',  
      body: formData
    });
    console.log("생성 완료",'submit values:', { itemId, linkURL, linkName,linkImage,bookMarkId});
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
                <div className='modal_sub'>이미지 {linkImage && (
              <img 
                src={linkImage.startsWith('/uploads/') ? linkImage : `/uploads/${linkImage}`}
                title={`현재 파일: ${linkImage}`}
                style={{
                  width: '20px', 
                  height: '20px', 
                  marginLeft: '10px',
                  verticalAlign: 'middle',
                  objectFit: 'cover',
                  borderRadius: '3px'
                }}
                onError={(e) => {
                  // 이미지 로드 실패 시 기본 아이콘으로 대체
                 e.target.style.display = 'none';
                }}
              />
            )} <input className='modal_input' type = "file" onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  // 파일명만 추출 (경로 제거)
                  const fileName = file.name;
                  setlinkImage(fileName);
                }
              }}/></div>
                <div className='submit_button'><button type="submit">{itemId ? '수정' : '추가'}</button></div>
          </form>
      </div>
    </div>
  );
};

export default Modal;