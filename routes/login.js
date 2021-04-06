const express = require('express');
const bodyParser = require('body-parser');
const { getToken } = require('../services');
const { isValidEmail, isValidPassword } = require('../middlewares');

const app = express();

const SUCCESS = 200;
app.use(bodyParser.json());
app.use(isValidEmail);
app.use(isValidPassword);

app.post('/', (request, response) => {
  const { email } = request.body || '';
  const token = getToken(email);
  response.status(SUCCESS).send({ token });
});

module.exports = app;
