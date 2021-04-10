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
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});
app.use(bodyParser.json());
app.get(CRUSH, crushControllers.getCrush);
app.get(
  `${CRUSH}/search`,
  validatedToken,
  crushControllers.searchCrush,
);
app.get(`${CRUSH}/:id`, crushControllers.getCrushById);
app.post(CRUSH, validatedToken, validatedNameAge, validatedDate, crushControllers.addCrush);
app.put(
  `${CRUSH}/:id`,
  validatedToken,
  validatedNameAge,
  validatedDate,
  crushControllers.updateCrush,
);
app.delete(
  `${CRUSH}/:id`,
  validatedToken,
  crushControllers.deleteCrush,
);
app.post('/login', loginControllers.getLogin);
app.listen(PORT, () => {
  console.log('Online');
});
