const express = require('express');
const cors = require('cors');
require('dotenv').config();

const moviesRouter = require('./routes/movies');
const authRouter = require('./routes/auth');

const app = express();

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.options(/(.*)/, cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Movie API is running 🎬' });
});

app.use('/movies', moviesRouter);
app.use('/auth', authRouter);

const PORT = process.env.PORT || 3333;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;