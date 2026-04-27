CREATE DATABASE IF NOT EXISTS movie_db;
USE movie_db;
 
CREATE TABLE IF NOT EXISTS movies (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(255) NOT NULL,
  detail     TEXT,
  coverimage VARCHAR(500),
  genre      VARCHAR(100),
  year       INT,
  rating     DECIMAL(3,1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
 
CREATE TABLE IF NOT EXISTS users (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  fname      VARCHAR(100) NOT NULL,
  lname      VARCHAR(100) NOT NULL,
  username   VARCHAR(100) NOT NULL UNIQUE,
  password   VARCHAR(255) NOT NULL,
  email      VARCHAR(255) NOT NULL UNIQUE,
  avatar     VARCHAR(500) DEFAULT 'https://www.melivecode.com/users/cat1.png',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);