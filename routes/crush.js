const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const authToken = require('../middlewares/crush/authTokenCheck');
const postHeaderNameCheck = require('../middlewares/crush/postHeaderNameCheck');
const postHeaderAgeCheck = require('../middlewares/crush/postHeaderAgeCheck');
const postHeaderDateUndefinedCheck = require('../middlewares/crush/postHeaderDateUndefinedCheck');
const postHeaderDateValuesCheck = require('../middlewares/crush/postHeaderDateValuesCheck');
const crushes = require('../crush.json');

const app = express();

app.use(bodyParser.json());
app.use(authToken);
app.use(postHeaderNameCheck);
app.use(postHeaderAgeCheck);
app.use(postHeaderDateUndefinedCheck);
app.use(postHeaderDateValuesCheck);

app.get('/', (request, response) => {
  if (crushes.length >= 1) {
    response.status(200).send(crushes);
  } else {
    response.status(200).send([]);  
  }
});

app.get('/:id', (request, response) => {
  const { id: idpedido } = request.params;
  crushes.forEach((crush) => {
    if (parseInt(crush.id, 10) === parseInt(idpedido, 10)) {
      response.status(200).send(crush);
    }
  });
  
  response.status(404).send({
    message: 'Crush não encontrado',
  });
});

app.post('/', (request, response) => {
  const { name, date, age } = request.body;
  const outputCrushes = crushes;
  const newCrush = {
    name,
    age,
    id: outputCrushes.length,
    date:{
      datedAt: date.datedAt,
      rate: date.rate,
    },
  };
  outputCrushes.push(newCrush);
  // fs.writeFile(path.join(__dirname, '..', 'crush.json'), JSON.stringify(outputCrushes), 'utf8');
  response.status(200).send(outputCrushes[outputCrushes.length - 1]);
});
module.exports = app;