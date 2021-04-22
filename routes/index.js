const express = require('express');
// const rescue = require('express-rescue');
const fs = require('fs');
const crypto = require('crypto');

const {
  validateEmail,
  validatePassword,
  validateToken,
  validadeAge,
  validadeDate,
  validateDateAt,
  validateName,
  validateRate,
} = require('../middlewares');

const dataFile = ('./crush.json');

const app = express();
app.use(express.json());

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  try {
    validateEmail(email);
    validatePassword(password);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
  const token = crypto.randomBytes(8).toString('hex');

  res.json({ token });
});

app.get('/crush/search', validateToken, (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
  const { q } = req.query;

  if (q === undefined || q === '') {
    return res.status(200).json(data);
  }
  const findArtist = data.filter((e) => (e.name).includes(q));

  res.status(200).json(findArtist);
});

app.route('/crush')
  .get((_req, res) => {
    try {
      const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
      res.status(200).json(data);
    } catch (error) {
      res.status(200).json([]);
    }
  }).post(
    validateToken,
    validateName,
    validadeAge,
    validadeDate,
    validateDateAt,
    validateRate,
    (req, res) => {
      const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
      const newArtist = req.body;

      let idValue = 1;
      data.forEach((e) => {
        if (e.id === idValue) {
          idValue += 1;
        }
      });

      newArtist.id = idValue;

      data.push(newArtist);

      fs.writeFileSync(dataFile, JSON.stringify(data));

      res.status(201).json(newArtist);
    },
  );

app.route('/crush/:id')
  .get((req, res) => {
    try {
      const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
      const { id } = req.params;
      const artist = data.find((e) => e.id === parseInt(id, 10));
      if (artist) {
        res.status(200).json(artist);
      } else {
        throw new Error();
      }
    } catch (error) {
      res.status(404).json({ message: 'Crush não encontrado' });
    }
  })
  .put(
    validateToken,
    validateName,
    validadeAge,
    validadeDate,
    validateDateAt,
    validateRate,
    (req, res) => {
      const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
      const artist = req.body;
      const ID = parseInt(req.params.id, 10);
      const editedArtists = data.filter((e) => e.id !== ID);
      artist.id = ID;
      editedArtists.push(artist);

      fs.writeFileSync(dataFile, JSON.stringify(editedArtists));

      res.status(200).json(artist);
    },
  )
  .delete(
    validateToken,
    (req, res) => {
      const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
      const ID = parseInt(req.params.id, 10);
      if (!data.some((e) => e.id === ID)) {
        return res.status(404).json({ message: 'Crush não encontrado' });
      }

      const removeArtists = data.filter((e) => e.id !== ID);

      fs.writeFileSync(dataFile, JSON.stringify(removeArtists));

      res.status(200).json({ message: 'Crush deletado com sucesso' });
    },
  );

module.exports = app;