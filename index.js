const express = require('express');
const route = require('./routes');

const app = express();

const SUCCESS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use('/crush', route.crush);

app.listen(PORT, () => { console.log('Online'); });
