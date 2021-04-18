const express = require('express');
const bodyParser = require('body-parser');
const crush = require('./crush');
const login = require('./login');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = '3000';

app.use('/crush', crush);
app.use('/login', login);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.listen(PORT, () => { console.log('Online!'); });
