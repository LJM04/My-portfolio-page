const multer = require('multer');
const path = require('path');
const fs = require('fs');

// 업로드 폴더 자동 생성 확인
try {
    fs.readdirSync('public/uploads');
} catch (error) {
    console.log('uploads 폴더 생성');
    fs.mkdirSync('public/uploads', { recursive: true });
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, 'public/uploads/');
        },
        filename(req, file, done) {
            file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
            const ext = path.extname(file.originalname);
            done(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + ext);
        },
    }),
    limits: { fileSize: 20 * 1024 * 1024 } // 20MB
});

module.exports = upload;