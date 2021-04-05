const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const NOT_FOUND = 404;
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

app.get('/crush/:id', (request, response) => {
  const { id } = request.params;
  const filter = getJSON().find((crush) => crush.id === Number(id));
  if (filter) {
    response.status(SUCCESS).json(filter);
  } else {
    response.status(NOT_FOUND).json({ message: 'Crush não encontrado' });
  }
});

app.listen(PORT, () => { console.log('Online'); });
