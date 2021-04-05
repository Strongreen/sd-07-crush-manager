const fs = require('fs', 'utf8');
const express = require('express');
const bodyParser = require('body-parser');

const crushFile = fs.readFileSync('./crush.json');

const app = express();
app.use(bodyParser.json());

app.get('/', (_req, res) => {
  if (crushFile.length > 0) {
    res.status(200).send(crushFile);
  } else {
    res.status(200).send([]);
  }
});

app.use((err, _req, res, _next) => {
  res.status(500).send(`Algo deu errado! Mensagem: ${err.message}`);
});

module.exports = app;
