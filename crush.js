const express = require('express');
const bodyParser = require('body-parser');

const fs = require('fs', 'utf8');

const app = express();
app.use(bodyParser.json());

app.get('/', (_req, res) => {
  res.status(200).send(fs.readFileSync('./crush.json'));
});

app.use((err, _req, res, _next) => {
  res.status(500).send(`Algo deu errado! Mensagem: ${err.message}`);
});

module.exports = app;
