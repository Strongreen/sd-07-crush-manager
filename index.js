const express = require('express');
const bodyParser = require('body-parser');
const crush = require('./crush.json');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', (req, res) => {
  return res.status(SUCCESS).send(crush);
});

app.listen(PORT, () => { console.log('Online'); });
