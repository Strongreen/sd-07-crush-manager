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

const getCrushList = () => {
  try {
    return JSON.parse(fs.readFileSync('./crush.json', 'utf-8'));
  } catch (err) {
    console.error(`Erro ao ler o arquivo: ${err.path}`);
  }
}

app.get('/crush', (_request, response) => {
  const crushList = getCrushList();
  if (crushList.length !== 0) {
    response.status(SUCCESS).send(crushList);
  } else {
    response.status(SUCCESS).send([]);
  }
});

app.get('/crush/:id', (request, response) => {
  const crushList = getCrushList();
  const { id } = request.params;
  const result = crushList.find((crush) => crush.id === Number(id));
  if (result) {
    response.status(SUCCESS).send(result);
  } else {
    response.status('404').send({
      message: 'Crush não encontrado',
    });
  }
});


