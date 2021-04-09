const crypto = require('crypto');
const express = require('express');
const loginMiddleware = require('../middlewares/loginValidations');

const app = express();
app.use(loginMiddleware);

app.post('/', (request, response) => {
  response.status(200).send({
    token: crypto.randomBytes(16).toString('hex'),
  });
});

module.exports = app;