const express = require('express');
const bodyParser = require('body-parser');
const { login } = require('./login');
const {
  getCrushes,
  getCrushesById,
  validateUser,
  validateName,
  validateAge,
  validateDate,
  validateRate,
  createCrush,
  updateCrush,
} = require('./services');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PATH_ID_CRUSH = '/crush/:id';

app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', getCrushes);
app.get(PATH_ID_CRUSH, getCrushesById);
app.post('/login', login);
app
  .post('/crush', validateUser, validateName, validateAge, validateDate, validateRate, createCrush);
app.put('/crush/:id', 
  validateUser, validateName, validateAge, validateDate, validateRate, updateCrush);

app.listen(3000, () => console.log('listening on port 3000'));
