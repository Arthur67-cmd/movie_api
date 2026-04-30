const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'movie_secret_key_2024';

// Middleware to verify JWT token
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ status: 'error', message: 'No token provided' });
  const token = authHeader.split(' ')[1];
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    res.status(401).json({ status: 'error', message: 'Invalid or expired token' });
  }
}

// POST /auth/register
router.post('/register', async (req, res) => {
  const { fname, lname, username, password, email, avatar } = req.body;
  if (!fname || !lname || !username || !password || !email) {
    return res.status(400).json({ status: 'error', message: 'All fields are required' });
  }
  try {
    const [existing] = await db.query(
      'SELECT id FROM users WHERE username = ? OR email = ?', [username, email]
    );
    if (existing.length > 0) {
      return res.status(409).json({ status: 'error', message: 'Username or email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      'INSERT INTO users (fname, lname, username, password, email, avatar) VALUES (?, ?, ?, ?, ?, ?)',
      [fname, lname, username, hashedPassword, email,
       avatar || 'https://www.melivecode.com/users/cat1.png']
    );
    const [newUser] = await db.query(
      'SELECT id, fname, lname, username, email, avatar FROM users WHERE id = ?',
      [result.insertId]
    );
    res.status(201).json({ status: 'ok', message: 'User registered successfully', user: newUser[0] });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// POST /auth/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ status: 'error', message: 'Username and password are required' });
  }
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length === 0) {
      return res.status(401).json({ status: 'error', message: 'Invalid username or password' });
    }
    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ status: 'error', message: 'Invalid username or password' });
    }
    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.json({
      status: 'ok',
      message: 'Login successful',
      accessToken: token,
      user: {
        id: user.id,
        fname: user.fname,
        lname: user.lname,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// GET /auth/profile (protected)
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id, fname, lname, username, email, avatar FROM users WHERE id = ?',
      [req.user.id]
    );
    if (rows.length === 0) return res.status(404).json({ status: 'error', message: 'User not found' });
    res.json({ status: 'ok', user: rows[0] });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// PUT /auth/avatar (protected) - update avatar URL
router.put('/avatar', verifyToken, async (req, res) => {
  const { avatar } = req.body;
  if (!avatar) {
    return res.status(400).json({ status: 'error', message: 'Avatar URL is required' });
  }
  try {
    await db.query('UPDATE users SET avatar = ? WHERE id = ?', [avatar, req.user.id]);
    const [updated] = await db.query(
      'SELECT id, fname, lname, username, email, avatar FROM users WHERE id = ?',
      [req.user.id]
    );
    res.json({ status: 'ok', message: 'Avatar updated', user: updated[0] });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

module.exports = router;