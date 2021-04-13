const crypto = require('crypto');
const express = require('express');
const loginEmailCheck = require('../middlewares/login/loginEmailCheck');
const loginPassCheck = require('../middlewares/login/loginPassCheck');

const app = express();
app.use(loginEmailCheck);
app.use(loginPassCheck);

app.post('/', (request, response) => response.status(200).send({
    token: crypto.randomBytes(8).toString('hex'),
  }));

module.exports = app;