const express = require('express');
const routesCrush = require('./Routes/crush');
const routesLogin = require('./Routes/auth');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();
app.use(express.json());

const SUCCESS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Credentials', '*');
  res.header('Access-Control-Expose-Headers', 'x-access-token'); // esta linha habilita o token no header
  next();
});
app.use('/login', routesLogin);
app.use('/crush', routesCrush);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log('Online');
});
