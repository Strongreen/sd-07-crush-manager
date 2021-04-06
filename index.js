const express = require('express');
const routes = require('./routes');
const {
  validateEmail,
  validatePassword,
} = require('./middlewares');

const app = express();

const SUCCESS = 200;
const PORT = 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use('/crush', routes.crush);
app.use('/crush', routes.crushId);
app.use('/login', validateEmail, validatePassword, routes.login);

app.listen(PORT, () => { console.log(`Online on port ${PORT}`); });
