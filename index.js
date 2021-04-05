const express = require('express');
const bodyParser = require('body-parser');
const routeCrush = require('./routers/crush');
const loginRoute = require('./routers/login');
const status = require('./helpers/status');

const { 
  nameMiddleware,
  authMiddleware,
  ageMiddleware,
  dateMiddleware,
  validDateMiddleware,
  validRateMiddleware,
} = require('./middlewares');

const app = express();
app.use(bodyParser.json());

const PORT = '3000';

const middlewaresCrush = [
  nameMiddleware, 
  ageMiddleware, 
  dateMiddleware, 
  validDateMiddleware, 
  validRateMiddleware,
];

app.use('/login', loginRoute);

app.post('/crush', middlewaresCrush);

app.put('/crush/:id', authMiddleware, middlewaresCrush);

app.delete('/crush/:id', authMiddleware);

app.use('/crush', routeCrush);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(status.SUCCESS).send();
});

app.listen(PORT, () => { console.log('Online'); });
