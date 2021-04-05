const express = require('express');
const bodyParser = require('body-parser');
const crushRoute = require('./crush');
const loginRoute = require('./login');

const app = express();
app.use(bodyParser.json());

app.use('/crush', crushRoute);
app.use('/login', loginRoute);

const SUCCESS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.listen(PORT, () => { console.log('Online'); });
