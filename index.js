const express = require('express');
const crush = require('./routes/crush');
const login = require('./routes/login');

const app = express();
app.use(express.json());

const SUCCESS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use(express.json());

app.use('/crush', crush);
app.use('/login', login);

app.listen(PORT, () => { console.log('Online'); });
