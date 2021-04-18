const express = require('express');
const bodyParser = require('body-parser');
const CrushRoute = require('./routes/CrushRoute');
const LoginRoute = require('./routes/LoginRoute');

const SUCCESS = 200;
const PORT = '3000';
 
 const Middlewares = require('./middleware');

const middlewaresCrush = [
  Middlewares.nameMiddleware,
  Middlewares.ageMiddleware,
  Middlewares.dateMiddleware,
  Middlewares.validDateMiddleware,
  Middlewares.validRateMiddleware,
];

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});
app.post('/login', Middlewares.emailMiddleware, Middlewares.passwordMiddleware);

app.post('/crush', Middlewares.authMiddleware, middlewaresCrush);

app.get('/crush/search', Middlewares.authMiddleware);

app.put('/crush/:id', Middlewares.authMiddleware, middlewaresCrush);

app.delete('/crush/:id', Middlewares.authMiddleware);

app.use('/login', LoginRoute);
app.use('/crush', CrushRoute);

app.listen(PORT, () => {
  console.log(`Aplicaçao Online rodando na Porta ${PORT}  `);
});
