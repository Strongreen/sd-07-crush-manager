const express = require('express');
const bodyParser = require('body-parser');
const crushes = require('./crush.json');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', (request, response) => {
  response.status(200).json(crushes);
});

app.listen(PORT, () => { console.log('Online'); });
