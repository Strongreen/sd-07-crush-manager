const express = require('express');
const bodyParser = require('body-parser');
const loginRoute = require('./routers/login');
const routeCrush = require('./routers/crush');
const status = require('./helpers/status');

const { 
  emailMiddleware,
  passwordMiddleware,
  nameMiddleware,
  authMiddleware,
  ageMiddleware,
  dateMiddleware,
  validDateMiddleware,
  validRateMiddleware,
} = require('./middlewares');

const app = express();
app.use(bodyParser.json());

const PORT = 3000;

const middlewaresCrush = [
  nameMiddleware, 
  ageMiddleware, 
  dateMiddleware, 
  validDateMiddleware, 
  validRateMiddleware,
];

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(status.SUCCESS).send();
});

app.post('/login', emailMiddleware, passwordMiddleware);

app.post('/crush', authMiddleware, middlewaresCrush);

app.get('/crush/search', authMiddleware);

app.put('/crush/:id', authMiddleware, middlewaresCrush);

app.delete('/crush/:id', authMiddleware);

app.use('/login', loginRoute);
app.use('/crush', routeCrush);

app.listen(PORT, () => { console.log('Online'); });
