const express = require('express');

const app = express();
app.use(express.json());
const SUCCESS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});
const crush = require('./routes/crush');
const login = require('./routes/login');

app.use('/crush', crush);
app.use('/login', login);

app.listen(3000);
