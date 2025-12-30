# 🔖 북마크 관리 시스템

Next.js와 MongoDB를 활용한 북마크 관리 및 공유 웹 애플리케이션

![북마크 메인](https://img.shields.io/badge/Next.js-14.0.3-black?style=flat-square&logo=next.js)
![MongoDB](https://img.shields.io/badge/MongoDB-6.3.0-green?style=flat-square&logo=mongodb)
![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)

## 북마크 홈
<img width="831" height="567" alt="image" src="https://github.com/user-attachments/assets/76a82e76-fa4e-439e-ac37-279ba957fe0d" />

## 북마크 수정 & 추가버튼시 화면
<img width="819" height="721" alt="image" src="https://github.com/user-attachments/assets/b492e60d-542f-4360-8baf-fbc56dd060c8" />

## 📌 프로젝트 소개

Next.js 환경으로 개발하였으며 사용자가 개인적으로 관리하고 공유할 수 있는 웹 기반 북마크 관리 웹페이지입니다. 고유한 북마크 코드를 통해 여러 디바이스에서 접근하거나 다른 사람과 공유할 수 있는 기능을 제공합니다.
### 주요 기능

- 고유 북마크 코드 생성 및 공유
- 북마크 추가/수정/삭제 (CRUD)
- 이미지 업로드 및 미리보기
- 북마크 코드 복사 기능
- MongoDB 기반 데이터 저장

---

## 🛠️ 기술 스택

### Frontend
- **Next.js 14.0.3** - React 프레임워크
- **React 18** - UI 라이브러리
- **Redux Toolkit** - 상태 관리
- **CSS** - 스타일링

### Backend
- **Next.js API Routes** - 서버리스 API
- **MongoDB 6.3.0** - NoSQL 데이터베이스
- **FormData** - 이미지 파일 처리

---


## 시작하기

### 1. 환경 요구사항

- MongoDB Atlas 계정 (또는 로컬 MongoDB)

### 2. 설치
```bash
# 디렉토리 이동
cd bookmark

# 패키지 설치
npm install
```

### 3. 환경 변수 설정

`.env` 파일을 프로젝트 루트에 생성:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
MONGODB_DB=bookmark
```

### 4. 실행
```bash
# 개발 서버 실행
npm run dev

# 브라우저에서 열기
# http://localhost:3000
```

---

## 사용 방법

### 1️. 북마크 생성

1. 메인 페이지에서 **"새로 생성"** 버튼 클릭
2. 자동으로 8자리 고유 코드 생성
3. 북마크 관리 페이지로 이동

### 2️. 북마크 추가

1. **+** 버튼 클릭
2. 북마크 정보 입력:
   - 이름
   - URL
   - 이미지 (선택)
3. **"추가"** 버튼 클릭

### 3️. 북마크 수정/삭제

- **✏️ 수정**: 수정 버튼 클릭 → 정보 수정 → 저장
- **🗑️ 삭제**: 삭제 버튼 클릭 → 즉시 삭제

### 4️. 북마크 공유

1. 우측 하단 **"북마크 코드 복사"** 클릭
2. 다른 사람에게 코드 전달
3. 메인 페이지에서 코드 입력 → 접속

---

## API 엔드포인트

### GET `/api/bookMark`

북마크 조회

**쿼리 파라미터:**
- `bookMarkId`: 북마크 코드 (전체 조회)
- `itemId`: 개별 항목 ID (단일 조회)
```javascript
// 전체 조회
GET /api/bookMark?bookMarkId=abc123

// 단일 조회
GET /api/bookMark?itemId=xyz789
```

### POST `/api/bookMark`

북마크 추가

**Body (FormData):**
- `itemId`: 항목 ID (자동 생성)
- `linkURL`: URL
- `linkName`: 이름
- `bookMarkId`: 북마크 코드
- `linkImage`: 이미지 파일 (선택)

### PATCH `/api/bookMark`

북마크 수정

**Body (FormData):**
- `itemId`: 수정할 항목 ID
- `linkURL`: URL
- `linkName`: 이름
- `bookMarkId`: 북마크 코드
- `linkImage`: 새 이미지 (선택)

### DELETE `/api/bookMark`

북마크 삭제

**Body (JSON):**
```json
{
  "itemId": "xyz789",
  "bookMarkId": "abc123"
}
```

---

## 주요 기능 설명

### Redux를 활용한 상태 관리
```javascript
// 북마크 코드 저장
dispatch(setInputValue('abc123'));

// 북마크 코드 조회
const bookMarkId = useSelector((state) => state.userInput.inputValue);
```

### FormData를 통한 이미지 업로드
```javascript
const formData = new FormData();
formData.append('linkImage', file);

// 서버에서 파일 저장
const fileName = `${Date.now()}_${file.name}`;
await fs.writeFile(`./public/uploads/${fileName}`, buffer);
```

---

## 데이터베이스 스키마

### Collection: `data`
```javascript
{
  itemId: String,        // 항목 고유 ID
  bookMarkId: String,    // 북마크 코드 (8자리)
  linkURL: String,       // URL
  linkName: String,      // 이름
  linkImage: String,     // 이미지 경로
  createdAt: Date,       // 생성일
  updatedAt: Date        // 수정일
}
```
