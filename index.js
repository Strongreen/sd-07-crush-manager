const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs')

const crushList = ('./crush.json');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.listen(PORT, () => { console.log('Online'); });

// 1 - Crie o endpoint GET /crush
app.get('/crush', (_request, response) => {
  const list = JSON.parse(fs.readFileSync(crushList));
  if(!list) {
    response.status(SUCCESS).send([])
  }
  response.status(SUCCESS).send(list);
})
