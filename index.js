const express = require('express');
const bodyParser = require('body-parser');
const routesCrush = require('./Routes/crush');
const routesLogin = require('./Routes/auth');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use(express.json());

app.use('/crush', routesCrush);

app.use('/crush/:id', routesCrush);

app.use('/login', routesLogin);


app.listen(PORT, () => {
  console.log('Online');
});
