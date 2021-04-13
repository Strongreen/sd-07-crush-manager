const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const bodyParser = require('body-parser');
const authToken = require('../middlewares/crush/authTokenCheck');
const postHeaderNameCheck = require('../middlewares/crush/postHeaderNameCheck');
const postHeaderAgeCheck = require('../middlewares/crush/postHeaderAgeCheck');
const postHeaderDateUndefinedCheck = require('../middlewares/crush/postHeaderDateUndefinedCheck');
const postHeaderDateValuesCheck = require('../middlewares/crush/postHeaderDateValuesCheck');

const jsonPath = path.join(__dirname, '..', 'crush.json');

const app = express();

app.use(bodyParser.json());
app.use(authToken);
app.use(postHeaderNameCheck);
app.use(postHeaderAgeCheck);
app.use(postHeaderDateUndefinedCheck);
app.use(postHeaderDateValuesCheck);

app.get('/', async (request, response) => {
  const crushes = JSON.parse(await fs.readFile(jsonPath, 'utf8'));
  if (crushes.length >= 1) {
    response.status(200).send(crushes);
  } else {
    response.status(200).send([]);  
  }
});

app.get('/:id', async (request, response) => {
  const { id: idpedido } = request.params;
  const crushes = JSON.parse(await fs.readFile(jsonPath, 'utf8'));
  crushes.forEach((crushe) => {
    if (parseInt(crushe.id, 10) === parseInt(idpedido, 10)) {
      response.status(200).send(crushe);
    }
  });
  
  response.status(404).send({
    message: 'Crush não encontrado',
  });
});

app.post('/', async (request, response) => {
  const { name, date, age } = request.body;
  const crushes = JSON.parse(await fs.readFile(jsonPath, 'utf8'));
  const outputCrushes = crushes;
  const newCrush = {
    name,
    age,
    id: outputCrushes.length,
    date: {
      datedAt: date.datedAt,
      rate: date.rate,
    },
  };
  outputCrushes.push(newCrush);
  fs.writeFileSync(
    path.join(__dirname, '..', 'crush.json'), outputCrushes, 'utf8',
  );
  // fs.writeFile(path.join(__dirname, 'crush.json'), JSON.stringify(outputCrushes));
  response.status(200).send(outputCrushes[outputCrushes.length - 1]);
});
module.exports = app;