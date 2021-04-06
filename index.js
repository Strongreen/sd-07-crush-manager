const express = require('express');
const routes = require('./routes');
const middlewares = require('./middlewares');

const app = express();

const SUCCESS = 200;
const PORT = 3000;

const {
  validateEmail,
  validatePassword,
  auth,
  validateName,
  validateAge,
  dateValidation,
  dateRateMW,
} = middlewares;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.post('/login', validateEmail, validatePassword);
app.post('/crush', auth, validateName, validateAge, dateValidation, dateRateMW);
app.use('/crush', routes.crush);
app.use('/crush', routes.crushId);
app.use('/login', routes.login);

app.listen(PORT, () => { console.log(`Online on port ${PORT}`); });
