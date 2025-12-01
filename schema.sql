-- 기존 데이터베이스가 있다면 선택, 없으면 생성
CREATE DATABASE IF NOT EXISTS portfolio_db;
USE portfolio_db;

-- 기존 테이블이 있다면 삭제 (초기화용 - 순서 중요)
DROP TABLE IF EXISTS studies;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS users;

-- -----------------------------------------------------
-- 1. 프로필 테이블 생성
-- -----------------------------------------------------
CREATE TABLE profile (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    school VARCHAR(100),
    major VARCHAR(100),
    email VARCHAR(100),
    address VARCHAR(100),
    skills VARCHAR(255),
    github_url VARCHAR(255),
    intro_content TEXT  -- 자기소개서 내용 (긴 글)
);

-- -----------------------------------------------------
-- 2. 관리자(Users) 테이블 생성
-- -----------------------------------------------------
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- 초기 관리자 계정 생성 (아이디: admin / 비번: 1234)
INSERT INTO users (username, password) VALUES ('admin', '1234');

-- -----------------------------------------------------
-- 3. 프로젝트(Projects) 테이블 생성
-- -----------------------------------------------------
CREATE TABLE projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,    -- 프로젝트 제목
    description TEXT,               -- 상세 설명
    tags VARCHAR(200),              -- 기술 스택 (예: Node.js,MySQL)
    github_url VARCHAR(255),        -- 깃허브 주소
    demo_url VARCHAR(255),          -- 배포 사이트 주소
    img_path TEXT,         			-- 대표 이미지 경로 (여러개 업로드용)
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------
-- 4. 스터디(Studies) 테이블 생성
-- -----------------------------------------------------
CREATE TABLE studies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    grade VARCHAR(20) NOT NULL,     -- 학년 (예: 1학년)
    subject VARCHAR(50) NOT NULL,   -- 과목명 (예: 자료구조)
    title VARCHAR(200) NOT NULL,    -- 글 제목
    content TEXT,                   -- 내용 정리
    file_path VARCHAR(255),         -- 첨부 파일 경로 (PDF, PPT 등)
    origin_filename VARCHAR(255),   -- 원본 파일명 (다운로드 시 필요)
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO profile (name, school, major, email, address, skills, github_url, intro_content)
VALUES (
    '임정민', 
    '인하공업전문대학(2024~2027졸업예정)', 
    '컴퓨터 시스템공학', 
    '202445085@itc.ac.kr', 
    '인천광역시 서구 청라동', 
    'java, javascript, node.js, mysql, aws', 
    'https://github.com/LJM04',
    '여기에 자기소개서 내용을 작성해주세요. (수정 페이지에서 작성 가능)'
);