# 📘 My Photofolio (Developer Portfolio)

개발자의 성장 과정과 프로젝트 경험을 기록하고 공유하기 위한 웹 포트폴리오 사이트입니다.
Node.js와 Express로 서버를 구축하고 MySQL로 데이터를 관리하며, 반응형 디자인을 위해 Bootstrap 5를 사용했습니다.

## 🚀 주요 기능

### 1. 메인 & 프로필 (Home & Profile)
* **포트폴리오 메인**: 프로필 요약, 최근 프로젝트 슬라이드, 스터디 목록(Accordion)을 한눈에 볼 수 있습니다.
* **자기소개서**: 개발자 소개 및 상세 이력을 확인할 수 있는 페이지를 제공합니다.
* **내 정보 수정**: 관리자 로그인 시 프로필, 기술 스택, GitHub 주소 등을 웹에서 직접 수정할 수 있습니다.

### 2. 프로젝트 관리 (Projects)
* **CRUD 기능**: 프로젝트 등록, 수정, 삭제가 가능합니다. (관리자 전용)
* **이미지 갤러리**: 프로젝트별로 여러 장의 이미지를 업로드하고 슬라이드(Carousel) 형태로 볼 수 있습니다.
* **상세 정보**: 기술 스택(태그), 깃허브/데모 링크 연결 기능을 제공합니다.

### 3. 학습 기록 (Study Log)
* **계층형 구조**: [학년 > 과목 > 게시글] 형태의 계층 구조로 학습 내용을 체계적으로 정리합니다.
* **파일 첨부**: 학습 자료(PDF, PPT 등)를 업로드하고 다운로드할 수 있습니다.
* **아코디언 UI**: 메인 페이지에서 학년별 과목을 아코디언 메뉴로 깔끔하게 탐색할 수 있습니다.

### 4. 관리자 시스템 (Admin)
* **로그인/로그아웃**: 세션(Session) 기반의 인증 시스템을 구현했습니다.
* **권한 관리**: 글 쓰기, 수정, 삭제 등의 기능은 로그인한 관리자만 접근 가능합니다.

---

## 🛠 기술 스택 (Tech Stack)

### Backend
* **Node.js**
* **Express.js** (Web Framework)
* **MySQL** (Database)
* **Multer** (File Upload)
* **Express-Session** (Authentication)

### Frontend
* **EJS** (Template Engine)
* **Bootstrap 5.3** (UI Framework)
* **CSS3** (Custom Styling)

---

## 📂 프로젝트 구조 (Directory Structure)

```bash
My-photofolio-page/
├── lib/
│   ├── db.js          # MySQL 데이터베이스 연결 설정
│   └── multer.js      # 파일 업로드(이미지, 문서) 설정
├── public/
│   ├── css/           # 커스텀 스타일시트
│   └── uploads/       # 업로드된 파일 저장소
├── routes/
│   ├── main.js        # 메인, 프로필, 로그인 라우터
│   ├── project.js     # 프로젝트 관련 라우터 (CRUD)
│   └── study.js       # 스터디 관련 라우터 (CRUD)
├── views/             # EJS 뷰 템플릿
│   ├── admin/         # 관리자(로그인, 정보수정) 뷰
│   ├── project/       # 프로젝트 목록, 상세, 작성 뷰
│   ├── study/         # 스터디 목록, 상세, 작성 뷰
│   ├── index.ejs      # 메인 페이지
│   └── intro.ejs      # 자기소개서 페이지
├── app.js             # 앱 진입점 (Server Entry Point)
├── schema.sql         # 데이터베이스 스키마 및 초기 데이터
└── package.json       # 의존성 패키지 목록


💾 데이터베이스 스키마 (Database Schema)
프로젝트는 총 4개의 테이블로 구성되어 있습니다.

profile: 사용자 프로필 정보 (이름, 학교, 기술스택, 자기소개 등)

users: 관리자 계정 정보 (로그인용)

projects: 포트폴리오 프로젝트 데이터 (제목, 설명, 이미지 경로, 태그 등)

studies: 학습 기록 데이터 (학년, 과목, 내용, 첨부파일 등)

상세 SQL은 schema.sql 파일을 참고하세요.

💻 설치 및 실행 방법 (Installation)
1. 프로젝트 클론 및 패키지 설치

Bash

git clone 
cd My-photofolio-page
npm install
2. 환경 변수 설정 (.env) 프로젝트 루트에 .env 파일을 생성하고 DB 정보를 입력하세요.

코드 스니펫

DB_HOST=localhost
DB_USER=root
DB_PASS=your_password
DB_NAME=portfolio_db
PORT=3000
SESSION_SECRET=your_secret_key
3. 데이터베이스 구축 MySQL 워크벤치나 CLI를 통해 schema.sql 파일을 실행하여 테이블을 생성하세요. (초기 관리자 계정: admin / 1234 로 설정되어 있습니다.)

4. 서버 실행

Bash

# 일반 실행
npm start

# 개발 모드 실행 (nodemon 필요)
npm run dev
