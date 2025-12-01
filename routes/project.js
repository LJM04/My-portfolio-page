const express = require('express');
const router = express.Router();
const db = require('../lib/db');
const upload = require('../lib/multer');

// 프로젝트 목록 (경로 수정됨: project/list)
router.get('/projects', (req, res) => {
    db.query('SELECT * FROM projects ORDER BY id DESC', (err, rows) => {
        if (err) return res.status(500).send('DB Error');
        const formattedProjects = rows.map(p => ({ ...p, tags: p.tags ? p.tags.split(',') : [] }));
        res.render('project/list', { projects: formattedProjects });
    });
});

// 프로젝트 상세 (경로 수정됨: project/detail)
router.get('/project/:id', (req, res) => {
    db.query('SELECT * FROM projects WHERE id = ?', [req.params.id], (err, results) => {
        if (results.length > 0) {
            const project = results[0];
            project.tags = project.tags ? project.tags.split(',') : [];
            res.render('project/detail', { project });
        } else {
            res.status(404).render('404');
        }
    });
});

// 글쓰기 화면 (경로 수정됨: project/write)
router.get('/write/project', (req, res) => {
    if (!req.session.isLoggedIn) return res.send('<script>alert("권한 필요"); location.href="/";</script>');
    res.render('project/write');
});

// 글쓰기 저장
router.post('/write/project', upload.array('img_file'), (req, res) => {
    const { title, description, tags, github_url, demo_url } = req.body;
    let imgPaths = null;
    if (req.files && req.files.length > 0) {
        imgPaths = req.files.map(f => `/uploads/${f.filename}`).join(',');
    }
    
    db.query('INSERT INTO projects (title, description, tags, img_path, github_url, demo_url) VALUES (?, ?, ?, ?, ?, ?)', 
        [title, description, tags, imgPaths, github_url, demo_url], 
        (err) => {
            if (err) throw err;
            res.redirect('/projects');
        }
    );
});

// 수정 화면 (경로 수정됨: project/edit)
router.get('/edit/project/:id', (req, res) => {
    if (!req.session.isLoggedIn) return res.send('<script>alert("권한 필요"); location.href="/";</script>');
    db.query('SELECT * FROM projects WHERE id = ?', [req.params.id], (err, results) => {
        if (results.length > 0) res.render('project/edit', { project: results[0] });
        else res.redirect('/projects');
    });
});

// 수정 처리
router.post('/edit/project/:id', upload.array('img_file'), (req, res) => {
    const { title, description, tags, github_url, demo_url } = req.body;
    let sql = 'UPDATE projects SET title=?, description=?, tags=?, github_url=?, demo_url=?';
    let params = [title, description, tags, github_url, demo_url];

    if (req.files && req.files.length > 0) {
        const imgPaths = req.files.map(f => `/uploads/${f.filename}`).join(',');
        sql += ', img_path=?';
        params.push(imgPaths);
    }
    sql += ' WHERE id=?';
    params.push(req.params.id);

    db.query(sql, params, (err) => {
        if (err) throw err;
        res.redirect(`/project/${req.params.id}`);
    });
});

// 삭제 처리
router.get('/delete/project/:id', (req, res) => {
    if (!req.session.isLoggedIn) return res.send('<script>alert("권한 필요"); location.href="/";</script>');
    db.query('DELETE FROM projects WHERE id = ?', [req.params.id], (err) => {
        if (err) throw err;
        res.send('<script>alert("삭제됨"); location.href="/projects";</script>');
    });
});

module.exports = router;