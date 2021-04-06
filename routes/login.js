const express = require('express');
const crypto = require('crypto');

const app = express();

async function validateEmail(email) {
  if (!email) throw new Error('O campo "email" é obrigatório');
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!re.test(email)) throw new Error('O "email" deve ter o formato "email@email.com"');
}

async function validatePassword(password) {
  if (!password) throw new Error('O campo "password" é obrigatório');
  if (password.length < 6) throw new Error('A "senha" deve ter pelo menos 6 caracteres');
}

app.post('/', async (req, res) => {
  const { email, password } = req.body;
  try {
    await validateEmail(email);
    await validatePassword(password);
    const token = crypto.randomBytes(8).toString('hex');
    res.status(200).send({ token });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = app;
