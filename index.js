const express = require('express');
const routes = require('./routes');
const middlewares = require('./middlewares');

const app = express();

const SUCCESS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use(express.json());
app.use('/crush/search', routes.search);
app.use('/crush', routes.crush);
app.use('/log', routes.login);

app.use(middlewares.errorMiddleware);

app.listen(PORT, () => { console.log('Online'); });
