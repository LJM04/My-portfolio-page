const express = require('express');
const router = express.Router();
const db = require('../lib/db');

// 메인 페이지
router.get('/', (req, res) => {
    db.query('SELECT * FROM profile WHERE id = 1', (err, profileRows) => {
        if (err) return res.status(500).send('DB Error');
        const profile = profileRows[0] || {}; 

        db.query('SELECT * FROM projects ORDER BY id DESC LIMIT 3', (err2, projectRows) => {
            if (err2) return res.status(500).send('DB Error');
            db.query('SELECT * FROM studies ORDER BY grade ASC, subject ASC', (err3, studyRows) => {
                if (err3) return res.status(500).send('DB Error');

                const simpleStudyTree = {};
                studyRows.forEach(row => {
                    if (!simpleStudyTree[row.grade]) simpleStudyTree[row.grade] = new Set();
                    simpleStudyTree[row.grade].add(row.subject);
                });

                const formattedProjects = projectRows.map(p => ({
                    ...p, tags: p.tags ? p.tags.split(',') : []
                }));

                res.render('index', { profile, projects: formattedProjects, simpleStudyTree });
            });
        });
    });
});

// 자기소개서 페이지
router.get('/intro', (req, res) => {
    db.query('SELECT * FROM profile WHERE id = 1', (err, rows) => {
        if (err) return res.status(500).send('DB Error');
        res.render('intro', { profile: rows[0] });
    });
});

// 로그인 페이지 (경로 수정됨: admin/login)
router.get('/login', (req, res) => res.render('admin/login'));

// 로그인 처리
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM users WHERE username=? AND password=?', [username, password], (err, rows) => {
        if (rows.length > 0) {
            req.session.isLoggedIn = true;
            req.session.save(() => res.redirect('/'));
        } else {
            res.send('<script>alert("실패"); location.href="/login";</script>');
        }
    });
});

// 로그아웃
router.get('/logout', (req, res) => {
    req.session.destroy(() => res.redirect('/'));
});

// 내 정보 수정 페이지 (경로 수정됨: admin/profile_edit)
router.get('/edit/profile', (req, res) => {
    if (!req.session.isLoggedIn) return res.send('<script>alert("권한이 없습니다."); location.href="/";</script>');
    db.query('SELECT * FROM profile WHERE id = 1', (err, rows) => {
        if (err) return res.status(500).send('DB Error');
        res.render('admin/profile_edit', { profile: rows[0] });
    });
});

// 내 정보 수정 처리
router.post('/edit/profile', (req, res) => {
    const { name, school, major, email, address, skills, github_url, intro_content } = req.body;
    db.query(`UPDATE profile SET name=?, school=?, major=?, email=?, address=?, skills=?, github_url=?, intro_content=? WHERE id=1`,
        [name, school, major, email, address, skills, github_url, intro_content],
        (err) => {
            if (err) throw err;
            res.redirect('/');
        }
    );
});

module.exports = router;