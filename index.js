const express = require('express');
const routeCrush = require('./routeCrush');
const routeLogin = require('./routeLogin');

const app = express();

const SUCCESS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use(express.json());
app.use('/login', routeLogin);
app.use('/crush', routeCrush);

app.listen(PORT, () => { console.log('Online'); });
