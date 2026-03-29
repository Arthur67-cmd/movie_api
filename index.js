const express = require('express');
const cors = require('cors');
require('dotenv').config();
 
const moviesRouter = require('./routes/movies');
 
const app = express();
 
app.use(cors());
app.use(express.json());
 
// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Movie API is running 🎬' });
});
 
app.use('/movies', moviesRouter);
 
const PORT = process.env.PORT || 3333;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
 
module.exports = app;