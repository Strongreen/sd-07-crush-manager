const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const fileCrushs = './crush.json';

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', (req, res) => {
  const crushs = JSON.parse(fs.readFile(fileCrushs), 'utf-8');  
  res.status(SUCCESS).send(crushs);
});

app.listen(PORT, () => { console.log('Online'); });
