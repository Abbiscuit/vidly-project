const express = require('express');
const app = express();

const Joi = require('@hapi/joi');

// body parsing
app.use(express.json());

// Template
const genres = [
  { id: 1, name: 'Horror' },
  { id: 2, name: 'Action' },
  { id: 3, name: 'Mystery' },
  { id: 4, name: 'Comedy' },
  { id: 5, name: 'Romance' }
];

// HOME
app.get('/', (req, res) => {
  res.send('Welcome to home');
});

app.get('/api/genres', (req, res) => {
  res.send(genres);
});

// CREATE
app.post('/api/genres', (req, res) => {
  const { error } = validateGenre(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const genre = {
    id: genres.length + 1,
    name: req.body.name
  };

  genres.push(genre);
  res.send(genre);
});

// READ
app.get('/api/genres/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));

  if (!genre) {
    return res.status(404).send('お探しのページは見つかりませんでした。');
  }

  res.send(genre);
});

// UPDATE
app.put('/api/genres/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));

  if (!genre) {
    return res.status(404).send('お探しのページは見つかりませんでした。');
  }

  const { error } = validateGenre(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  genre.name = req.body.name;
  res.send(genre);
});

// DELETE
app.delete('/api/genres/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));

  if (!genre) {
    return res.status(404).send('お探しのページは見つかりませんでした。');
  }

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genre);
});

// Validatation
const validateGenre = genre => {
  const schema = Joi.object().keys({
    name: Joi.string()
      .min(2)
      .required()
  });

  return Joi.validate(genre, schema);
};

// SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
