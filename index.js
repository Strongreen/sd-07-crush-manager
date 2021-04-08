const express = require('express');
const bodyParser = require('body-parser');

const crush = require('./routers/crush');
const login = require('./routers/login');
const teste = require('./routers/teste');

const app = express();
app.use(bodyParser.json());

const SUCCESS_200 = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS_200).send();
});

app.use('/login', login);
app.use('/crush', crush);
app.use('/teste', teste);

app.listen(PORT, () => { console.log('Online'); });
