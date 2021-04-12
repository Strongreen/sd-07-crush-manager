const express = require('express');
const crush = require('./routes/crush');
const login = require('./routes/login');

const app = express();
app.use(express.json());

const SUCCESS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use('/crush', crush);

app.use('/login', login);

const err = (error, _req, res, _next) => {
  const { status, resp } = error;
  res.status(status).send({ message: resp });
};

app.use(err);

app.listen(PORT, () => { console.log('Online'); });
