const express = require('express');
const router = express.Router();
const db = require('../lib/db');
const upload = require('../lib/multer');

// 스터디 목록 (경로 수정됨: study/list)
router.get('/studies', (req, res) => {
    db.query('SELECT * FROM studies ORDER BY grade ASC, subject ASC, id DESC', (err, rows) => {
        if (err) return res.status(500).send('DB Error');
        const fullStudyTree = {};
        rows.forEach(row => {
            const { grade, subject } = row;
            if (!fullStudyTree[grade]) fullStudyTree[grade] = {};
            if (!fullStudyTree[grade][subject]) fullStudyTree[grade][subject] = [];
            fullStudyTree[grade][subject].push(row);
        });
        res.render('study/list', { fullStudyTree });
    });
});

// 스터디 상세 (경로 수정됨: study/detail)
router.get('/study/:id', (req, res) => {
    db.query('SELECT * FROM studies WHERE id = ?', [req.params.id], (err, results) => {
        if (results.length > 0) res.render('study/detail', { study: results[0] });
        else res.status(404).render('404');
    });
});

// 글쓰기 화면 (경로 수정됨: study/write)
router.get('/write/study', (req, res) => {
    if (!req.session.isLoggedIn) return res.send('<script>alert("권한 필요"); location.href="/";</script>');
    res.render('study/write');
});

// 글쓰기 저장
router.post('/write/study', upload.single('study_file'), (req, res) => {
    const { grade, subject, title, content } = req.body;
    const filePath = req.file ? `/uploads/${req.file.filename}` : null;
    const originName = req.file ? req.file.originalname : null;

    db.query('INSERT INTO studies (grade, subject, title, content, file_path, origin_filename) VALUES (?, ?, ?, ?, ?, ?)',
        [grade, subject, title, content, filePath, originName], 
        (err) => {
            if (err) throw err;
            res.redirect('/studies');
        }
    );
});

// 수정 화면 (경로 수정됨: study/edit)
router.get('/edit/study/:id', (req, res) => {
    if (!req.session.isLoggedIn) return res.send('<script>alert("권한 필요"); location.href="/";</script>');
    db.query('SELECT * FROM studies WHERE id = ?', [req.params.id], (err, results) => {
        if (results.length > 0) res.render('study/edit', { study: results[0] });
        else res.redirect('/studies');
    });
});

// 수정 처리
router.post('/edit/study/:id', upload.single('study_file'), (req, res) => {
    const { grade, subject, title, content } = req.body;
    let sql = 'UPDATE studies SET grade=?, subject=?, title=?, content=?';
    let params = [grade, subject, title, content];

    if (req.file) {
        sql += ', file_path=?, origin_filename=?';
        params.push(`/uploads/${req.file.filename}`, req.file.originalname);
    }
    sql += ' WHERE id=?';
    params.push(req.params.id);

    db.query(sql, params, (err) => {
        if (err) throw err;
        res.redirect('/studies');
    });
});

// 삭제 처리
router.get('/delete/study/:id', (req, res) => {
    if (!req.session.isLoggedIn) return res.send('<script>alert("권한 필요"); location.href="/";</script>');
    db.query('DELETE FROM studies WHERE id = ?', [req.params.id], (err) => {
        if (err) throw err;
        res.send('<script>alert("삭제됨"); location.href="/studies";</script>');
    });
});

module.exports = router;