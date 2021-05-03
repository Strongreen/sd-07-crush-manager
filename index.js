const express = require('express');
const bodyParser = require('body-parser');
const midwares = require('./middlewares/index');
const crush = require('./routes/crush');
const login = require('./routes/login');

const app = express();
app.use(bodyParser.json());

app.use('/crush', crush);
app.use('/login', login);

app.use(midwares.errorMid);

const SUCCESS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.listen(PORT, () => {
  console.log(`Rodando na porta ${PORT}`);
});
