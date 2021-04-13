const express = require('express');
const bodyParser = require('body-parser');

const crush = require('./routes/crush');
const login = require('./routes/login');
const middleware = require('./middlewares');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use('/login', login);

// app.use(middleware.authorizationMiddleware);
// app.use(middleware.nameMiddleware);
// app.use(middleware.ageMiddleware);
// app.use(middleware.dateMiddleware);

app.use('/crush', crush);

app.use(middleware.errorMiddleware);

app.listen(PORT, () => { console.log('Online'); });
