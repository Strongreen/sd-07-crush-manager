const express = require('express');
const bodyParser = require('body-parser');
const crush = require('./routes/crush');
const login = require('./routes/login');
const middlewares = require('./middlewares');

const app = express();
app.use(bodyParser.json());

app.use('/crush', crush);
app.use('/login', login);

const SUCCESS = 200;
const PORT = '3000';


// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.listen(PORT, () => {
  console.log(`Rodando na porta ${PORT}`);
});
