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
  .post(addCrush);

app.get('/crush/search', searchCrush);

app
  .route('/crush/:id')
  .get(identifyID)
  .put(editCrush)
  .delete(deleteCrush);

app.listen(PORT, () => { console.log('Online'); });
