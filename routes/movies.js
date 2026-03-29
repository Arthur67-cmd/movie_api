const express = require('express');
const router = express.Router();
const db = require('../db');
 
// GET all movies
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM movies ORDER BY id ASC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
 
// GET movie by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM movies WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Movie not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
 
// POST create a new movie
router.post('/', async (req, res) => {
  const { name, detail, coverimage, genre, year, rating } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO movies (name, detail, coverimage, genre, year, rating) VALUES (?, ?, ?, ?, ?, ?)',
      [name, detail, coverimage, genre, year, rating ?? 0]
    );
    const [newMovie] = await db.query('SELECT * FROM movies WHERE id = ?', [result.insertId]);
    res.status(201).json(newMovie[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
 
// PUT update a movie
router.put('/:id', async (req, res) => {
  const { name, detail, coverimage, genre, year, rating } = req.body;
  try {
    const [check] = await db.query('SELECT id FROM movies WHERE id = ?', [req.params.id]);
    if (check.length === 0) return res.status(404).json({ error: 'Movie not found' });
 
    await db.query(
      'UPDATE movies SET name = ?, detail = ?, coverimage = ?, genre = ?, year = ?, rating = ? WHERE id = ?',
      [name, detail, coverimage, genre, year, rating, req.params.id]
    );
    res.json({ message: 'Movie updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
 
// PATCH update rating only (used by Flutter app)
router.patch('/:id/rating', async (req, res) => {
  const { rating } = req.body;
  if (rating === undefined || rating < 0 || rating > 5) {
    return res.status(400).json({ error: 'Rating must be between 0 and 5' });
  }
  try {
    const [check] = await db.query('SELECT id FROM movies WHERE id = ?', [req.params.id]);
    if (check.length === 0) return res.status(404).json({ error: 'Movie not found' });
 
    await db.query('UPDATE movies SET rating = ? WHERE id = ?', [rating, req.params.id]);
    const [updated] = await db.query('SELECT * FROM movies WHERE id = ?', [req.params.id]);
    res.json(updated[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
 
// DELETE a movie
router.delete('/:id', async (req, res) => {
  try {
    const [check] = await db.query('SELECT id FROM movies WHERE id = ?', [req.params.id]);
    if (check.length === 0) return res.status(404).json({ error: 'Movie not found' });
 
    await db.query('DELETE FROM movies WHERE id = ?', [req.params.id]);
    res.json({ message: 'Movie deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
 
module.exports = router;