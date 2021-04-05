const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

const getJSON = () => JSON.parse(fs.readFileSync('./crush.json', 'utf-8'));
app.get('/crush', (_request, response) => {
  const data = getJSON();
  response.status(SUCCESS).json(data);
});

app.listen(PORT, () => { console.log('Online'); });
