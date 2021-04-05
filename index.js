const express = require('express');
const login = require('./routes/login');
const crush = require('./routes/crush');

const app = express();
const SUCCESS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use('/crush', crush);

app.use('/login', login);

app.use((err, _req, res, _next) => {
  res.status(500).send(`Algo deu errado: ${err.message}`);
});

app.listen(3000, () => console.log('ouvindo na porta 3000!'));
