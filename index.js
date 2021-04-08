const express = require('express');
const bodyParser = require('body-parser');
const { readFiles, addCrush, identifyID, editCrush, login } = require('./helper');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app
  .route('/crush')
  .get(readFiles)
  .post(addCrush);

app
  .route('/crush/:id')
  .get(identifyID)
  .put(editCrush);

app.post('/login', login);

app.listen(PORT, () => { console.log('Online'); });
