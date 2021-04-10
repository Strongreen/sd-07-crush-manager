const express = require('express');

const bodyParser = require('body-parser');
const {
  validatedToken,
  validatedNameAge,
  validatedDate,
} = require('./Middlewares/index');

const crushControllers = require('./Controllers/indexCrush');
const loginControllers = require('./Controllers/indexLogin');

const app = express();
const SUCCESS = 200;
const PORT = '3000';
const CRUSH = '/crush';
const CRUSH_ID = '/crush/:id';
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use(bodyParser.json());
app.get(CRUSH, crushControllers.getCrush);
app.post(CRUSH, validatedToken, validatedNameAge, validatedDate, crushControllers.addCrush);
app.get(CRUSH_ID, crushControllers.getCrushById);
app.post('/login', loginControllers.getLogin);
app.put(
  '/crush/:id',
  validatedToken,
  validatedNameAge,
  validatedDate,
  crushControllers.updateCrush,
);
app.delete(
  '/crush/:id',
  validatedToken,
  validatedNameAge,
  validatedDate,
  crushControllers.deleteCrush,
);
app.listen(PORT, () => {
  console.log('Online');
});
