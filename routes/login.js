const express = require('express');
const cryptoRandomString = require('crypto-random-string');
const loginMiddleware = require('../middlewares/loginValidations');

const app = express();
app.use(loginMiddleware);

app.post('/', (request, response) => {
  response.status().send({
    token: cryptoRandomString({ length: 16 }),
  });
});

module.exports = app;