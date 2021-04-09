const express = require('express');
const bodyParser = require('body-parser');
const { 
  readFiles, 
  addCrush, 
  identifyID, 
  editCrush, 
  login, 
  deleteCrush,
  searchCrush,
} = require('./helper');

const { validToken } = require('./Validated');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app
  .route('/login')
  .post(login);

app
  .route('/crush')
  .get(readFiles)
  .post(validToken, addCrush);

app.get('/crush/search',validToken, searchCrush);

app
  .route('/crush/:id')
  .get(identifyID)
  .put(validToken, editCrush)
  .delete(validToken, deleteCrush);

app.listen(PORT, () => { console.log('Online'); });
