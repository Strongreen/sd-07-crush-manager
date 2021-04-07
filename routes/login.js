const routes = require('express').Router();
const { generateToken } = require('../services/functions');

routes.post('/', async (req, res) => {
  const token = generateToken();
  res.status(200).send({ token });
});

module.exports = routes;
