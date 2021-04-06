const express = require('express');
const bodyParser = require('body-parser');
const middleware = require('./middleware');
const routeCrush = require('./router');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use('/', routeCrush);

app.use(middleware.errorMiddleware);

app.listen(PORT, () => { console.log('Online'); });
