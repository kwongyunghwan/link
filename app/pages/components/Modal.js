import React, { useEffect,useState } from 'react';
import crypto from 'crypto';
import '../../styles/modal.css'

const Modal = ({ bookMarkId, itemId, isOpen, onClose }) => {
const [linkURL, setlinkURL] = useState('');
const [linkName, setlinkName] = useState('');
const [linkImage, setlinkImage] = useState('');
const [hasNewFile, setHasNewFile] = useState(false);
const [selectedFilePreview, setSelectedFilePreview] = useState(null);

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
        setHasNewFile(false);
        setSelectedFilePreview(null);
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
        setHasNewFile(false);
        setSelectedFilePreview(null);
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
        <form onSubmit={InsertBookMark}>
          <div className="close_button"><button type="button" onClick={onClose}>닫기</button></div>
          <div className='modal_title'>북마크</div>
          <p>북마크의 정보를 작성해 주세요.</p>
          
          {/* 그리드 레이아웃 컨테이너 */}
          <div className='modal_sub grid-layout'>
            {/* 이미지 미리보기 영역 - 1열 1,2행 차지 */}
            <div 
              className="image-preview-section clickable grid-image"
              onClick={() => {
                document.getElementById('file-input').click();
              }}
            >
              {/* 기존 이미지 (수정모드에서만) */}
              {itemId && linkImage && !hasNewFile && (
                <img 
                  src={linkImage}
                  title={`현재 파일: ${linkImage}`}
                  className="current-image"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              )}
              
              {/* 새 파일 미리보기 */}
              {hasNewFile && selectedFilePreview && (
                <img 
                  src={selectedFilePreview}
                  title="새로 선택한 파일"
                  className="new-file-image"
                />
              )}
              
              {/* 이미지가 없을 때 */}
              {!linkImage && !selectedFilePreview && (
                <div className="no-image-placeholder">+</div>
              )}
            </div>
            
            {/* NAME - 2열 1행 */}
  <div className="grid-name">
    이름
    <input className='modal_input' type="text" value={linkName} onChange={(e)=> setlinkName(e.target.value)}/>
  </div>

  {/* URL - 2열 2행 */}
  <div className="grid-url">
    URL
    <input className='modal_input' type="text" value={linkURL} onChange={(e)=> setlinkURL(e.target.value)}/>
  </div>
            
            {/* 숨겨진 파일 입력 */}
            <input 
              id="file-input"
              type="file" 
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setHasNewFile(true);
                  
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    setSelectedFilePreview(event.target.result);
                  };
                  reader.readAsDataURL(file);
                } else {
                  setHasNewFile(false);
                  setSelectedFilePreview(null);
                }
              }}
            />
          </div>
          
          <div className='submit_button'><button type="submit">{itemId ? '수정' : '추가'}</button></div>
        </form>
      </div>
    </div>
  );
  }

export default Modal;