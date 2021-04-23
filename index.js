const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
const SUCCESS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use(bodyParser.json());
app.use('/crush', routes.crushRoute);
app.use('/login', routes.loginRoute);

app.listen(PORT, () => { console.log(`Online na porta ${PORT}`); });
