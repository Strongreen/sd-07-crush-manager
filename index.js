const express = require('express');

const { Login, Search, Crush } = require('./routes');
const { Auth } = require('./middleware');

const app = express();
app.use(express.json());

const SUCCESS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => response
  .status(SUCCESS)
  .send('PROJETO CRUSH MANAGER - TRYBE'));

app.use('/crush', Search);

app.use('/login', Login);

app.use(Auth);

app.use('/crush', Crush);

app.use((err, _req, res, _next) => {
  const { status, message } = err;
  res.status(status).send({
    message,
  });
});

app.listen(PORT, () => {
  console.log('Online');
});
