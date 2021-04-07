const express = require('express');
const bodyParser = require('body-parser');
const routeCrush = require('./routes/crush');
const routeLogin = require('./routes/login');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use('/login', routeLogin);
app.use('/crush', routeCrush);

app.listen(PORT, () => {
  console.log('Online');
});
