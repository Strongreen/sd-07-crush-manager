const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = '3000';
const DATAPATH = './crush.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', (_request, response) => {
  const crushes = JSON.parse(fs.readFileSync(DATAPATH));
  response.status(SUCCESS).json(crushes);
});

app.listen(PORT, () => { console.log('Online'); });
