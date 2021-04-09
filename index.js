const express = require('express');

const app = express();

const routes = require('./routes');

const { errorMiddleware } = require('./middlewares');

app.use(express.json());
app.use(routes);

const SUCCESS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use(errorMiddleware);
app.listen(PORT, () => {
  console.log('Online');
});
