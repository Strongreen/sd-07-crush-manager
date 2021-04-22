const express = require('express');
const { loginMiddleware } = require('../middlewares');
const auth = require('../auth');

const route = express.Router();

route.post('/login', loginMiddleware, (_req, res) => {
  const token = auth();
  res.status(200).json({ token });
});

module.exports = route;
