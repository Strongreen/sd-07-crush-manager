const express = require('express');
const bodyParser = require('body-parser');
const crush = require('./routers/crush');
const login = require('./routers/login');

const { 
  emailMiddleware,
  passwordMiddleware,
} = require('./middlewares');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.post('/login', emailMiddleware, passwordMiddleware);

app.use('/crush', crush);
app.use('/login', login);

app.listen(PORT, () => { console.log('Online'); });
