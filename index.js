const express = require('express');
const { Crush, Login } = require('./routes');

const app = express();
app.use(express.json());

const SUCCESS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use('/login', Login);

app.use('/crush', Crush);

app.listen(PORT, () => { console.log('Online'); });
