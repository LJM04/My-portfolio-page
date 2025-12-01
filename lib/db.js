const mysql = require('mysql2');
require('dotenv').config(); // 설정 불러오기

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

connection.connect((err) => {
    if (err) {
        console.error('❌ DB 연결 실패:', err.stack);
        return;
    }
    console.log('✅ MySQL DB 연결 성공!');
});

module.exports = connection;
