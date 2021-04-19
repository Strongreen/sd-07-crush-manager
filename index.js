const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const routesIdCrushes = '/crush/:id';

app.use(bodyParser.json());

const { crushById, getAllCrushes } = require('./middlewares/middlewareCrushGets');
const { login } = require('./middlewares/middlewareLogin');
const { tokenCheck } = require('./middlewares/middlewareTokenCheck');
const { createCrush } = require('./middlewares/middlewareNewCrush');
const { nameCheck } = require('./middlewares/middlewareNameCheck');
const { ageCheck } = require('./middlewares/middlewareAgeCheck');
const { dateCheck } = require('./middlewares/middlewareDateCheck');
const { dateAtCheck } = require('./middlewares/middlewareDateAtCheck');
const { rateCheck } = require('./middlewares/middlewareRateCheck');
const { updateCrush } = require('./middlewares/middlewareUpdateCrush');
const { deleteCrush } = require('./middlewares/middlewareDeleteCrush');

const SUCCESS = 200;
const PORT = '3000';

app.get(routesIdCrushes, crushById);
app.get('/crush', getAllCrushes);
app.post('/crush', tokenCheck, nameCheck, ageCheck, dateCheck, dateAtCheck, rateCheck, createCrush);
app.put(routesIdCrushes,
  tokenCheck,
  nameCheck,
  ageCheck,
  dateCheck,
  dateAtCheck,
  rateCheck,
  updateCrush);
app.delete(routesIdCrushes, tokenCheck, deleteCrush);

app.post('/login', login);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.listen(PORT, () => { console.log('Online'); });
