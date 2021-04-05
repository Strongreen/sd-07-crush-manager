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

app.listen(PORT, () => { console.log('Online'); });

app.get('/crush', (_request, response) => {
  const data = JSON.parse(fs.readFileSync('./crush.json', 'utf-8'));
  if (data.length !== 0) {
    response.status(SUCCESS).send(data);
  } else {
    response.status(SUCCESS).send([]);
  }
});
