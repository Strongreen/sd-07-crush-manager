const express = require('express');
const bodyParser = require('body-parser');

const fs = require('fs');

const crush = './crush.json';

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', (_req, res) => {
  const crushs = JSON.parse(fs.readFileSync(crush), 'utf-8');  
  res.status(SUCCESS).send(crushs);
});

app.listen(PORT, () => { console.log('Online'); });
