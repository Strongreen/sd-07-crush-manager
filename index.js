const express = require('express');
const routes = require('./routes/index');

const app = express();

const SUCCESS = 200;
const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send({
    message: 'Projeto Trybe',
  });
});

app.use(express.json());
app.use('/', routes);

app.listen(PORT, () => { console.log('Online'); });
