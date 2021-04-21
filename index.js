const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const { OK } = require('./httpCode');

const app = express();
app.use(bodyParser.json());

const PORT = 3000;

app.get('/', (_req, res) => {
  res.status(OK).send();
});

app.get('/crush', async (_req, res) => {
  const data = await fs.promises.readFile(`${__dirname}/crush.json`, 'utf-8')
    .then((result) => res.status(OK).send(JSON.parse(result)))
    .catch((err) => console.error(err));
  return data;
});

app.listen(PORT, () => {
  console.log('Online');
});
