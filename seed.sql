USE movie_db;
 
-- Clear existing data
DELETE FROM movies;
ALTER TABLE movies AUTO_INCREMENT = 1;
 
INSERT INTO movies (name, detail, coverimage, genre, year, rating) VALUES
(
  'Dune: Part Two',
  'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the universe, he must prevent a terrible future only he can foresee.',
  'https://m.media-amazon.com/images/M/MV5BN2QyZGU4ZDctOWMzMy00NTc5LThlOGQtODhmNDI1NjgzMzhjXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg',
  'Sci-Fi / Adventure',
  2024,
  4.8
),
(
  'Inside Out 2',
  'Joy, Sadness, Anger, Fear, and Disgust must make room for new emotions Anxiety, Envy, Ennui, and Embarrassment as Riley enters the complicated world of adolescence.',
  'https://m.media-amazon.com/images/M/MV5BZDg4YTgyNzItMzFhNS00YzU2LTg1YTYtMDBiMTU2MzliNDMwXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
  'Animation / Family',
  2024,
  4.5
),
(
  'Deadpool & Wolverine',
  'Deadpool is offered a chance to join the Time Variance Authority, but instead recruits a variant of Wolverine to help save his universe from extinction.',
  'https://m.media-amazon.com/images/M/MV5BZTNiMjM1YjgtNzFlNC00YjI5LWE1MGYtZDQ1YWIxMGFiODYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
  'Action / Comedy',
  2024,
  4.6
),
(
  'Alien: Romulus',
  'A group of young space colonizers come face to face with the most terrifying life form in the universe while scavenging an abandoned space station.',
  'https://m.media-amazon.com/images/M/MV5BZDQzOGJlNzEtYzlhYy00NjM2LWI5NmItZWZmNDZiNGQzYTU1XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
  'Sci-Fi / Horror',
  2024,
  4.4
),
(
  'Wicked',
  'The untold story of the witches of Oz. Elphaba, a young woman misunderstood because of her unusual green skin, and Glinda, a popular young woman, form an unlikely but profound friendship.',
  'https://m.media-amazon.com/images/M/MV5BNzQ1ODUzOTktMzEzMC00YjFlLWI3ZTQtMmM1YjI2MzgwNzZmXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
  'Musical / Fantasy',
  2024,
  4.7
),
(
  'Moana 2',
  'Moana sets sail on an expansive voyage into the far seas of Oceania and to the forgotten island of Motufetu, encountering long-lost peoples across the ocean.',
  'https://m.media-amazon.com/images/M/MV5BMTEzMTI4NjQtZTc4Ni00YzE5LThlZjQtNzI3ZWU0OGJiN2Q2XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
  'Animation / Adventure',
  2024,
  4.3
),
(
  'Gladiator II',
  'After his home is conquered by tyrants, Lucius is forced to enter the Colosseum and must look to his past to find strength to return the glory of Rome to its people.',
  'https://m.media-amazon.com/images/M/MV5BNjM2NTc4MzUtMjYxNi00ZmEyLWI5ZmMtZjgwNmMxMmFiNmE1XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
  'Action / Drama',
  2024,
  4.4
),
(
  'A Complete Unknown',
  'The story of 19-year-old Bob Dylan''s arrival in New York City in 1961 and his meteoric rise as a folk musician, culminating in his controversial decision to go electric at the 1965 Newport Folk Festival.',
  'https://m.media-amazon.com/images/M/MV5BYTE4ZDI0YTItOTI4ZC00OGZiLTkzNjQtOTM5ZjFiYTI1NzZhXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
  'Biography / Drama',
  2024,
  4.6
);