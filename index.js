const express = require('express');
const { crush, login } = require('./controllers/index');

const app = express();
const SUCCESS = 200;

const PORT = 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use('/crush', crush);
app.use('/login', login);

app.listen(PORT, () => { console.log('Online'); });
