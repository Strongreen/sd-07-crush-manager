const express = require('express');

const loginRoute = express();

loginRoute.post('/', async (req, res) => {
  try {
    res.status(200).send({ message: 'Entrou na rota login!' });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = loginRoute;