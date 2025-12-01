require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');

// [NEW] 분리된 라우터 불러오기
const mainRouter = require('./routes/main');
const projectRouter = require('./routes/project');
const studyRouter = require('./routes/study');


const app = express();
const PORT = process.env.PORT || 3000;

// 1. 설정 및 미들웨어
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET || 'secret_key',
    resave: false,
    saveUninitialized: false
}));

// 전역 변수 (로그인 여부)
app.use((req, res, next) => {
    res.locals.isLoggedIn = req.session.isLoggedIn || false;
    next();
});

// 2. 라우터 연결 (매우 중요!)
app.use('/', mainRouter);    // 홈, 로그인, 프로필
app.use('/', projectRouter); // 프로젝트 관련
app.use('/', studyRouter);   // 스터디 관련

// 3. 404 에러 처리
app.use((req, res, next) => {
    res.status(404).render('404');
});

// 4. 서버 실행
app.listen(PORT, () => {
    console.log(`🚀 Server on http://localhost:${PORT}`);
});