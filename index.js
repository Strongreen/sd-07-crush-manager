const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const STATUSCODE = {
  SUCCESS: 200,
  NOT_FOUND: 404,
};

const PORT = '3000';
const DATAPATH = './crush.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(STATUSCODE.SUCCESS).send();
});

app.get('/crush', (_request, response) => {
  const crushes = JSON.parse(fs.readFileSync(DATAPATH));
  response.status(STATUSCODE.SUCCESS).json(crushes);
});

app.get('/crush/:id', (request, response) => {
  const { id } = request.params;
  const crushes = JSON.parse(fs.readFileSync(DATAPATH));
  const crush = crushes.find((data) => data.id === parseInt(id, 10));
  if (crush) response.status(STATUSCODE.SUCCESS).json(crush);
  response.status(STATUSCODE.NOT_FOUND).json({ message: 'Crush não encontrado' });
});

app.listen(PORT, () => { console.log('Online'); });
