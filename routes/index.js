const express = require('express');
// const rescue = require('express-rescue');
const fs = require('fs');
const crypto = require('crypto');

const {
  // validateToken,
  validateEmail,
  validatePassword,
} = require('../middlewares');

const dataFile = ('./crush.json');

const app = express();
app.use(express.json());

app.get('/crush', async (_req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
    res.status(200).json(data);
  } catch (error) {
    res.status(200).json([]);
  }
});

app.get('/crush/:id', async (req, res) => {
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
});

app.post('/login', (req, res) => {
  const { body } = req;
  const { email, password } = body;

  try {
    const emailValid = validateEmail(email);
    const passwordValid = validatePassword(password);

    if (emailValid && passwordValid) {
      const authorization = crypto.randomBytes(8).toString('hex');
      // console.log(authorization);
      return res.status(200).json({ token: authorization });
    }
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = app;