const express = require('express');

const routes = require('./routes');

const app = express();

const SUCCESS = 200;
const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', routes.crush);
app.get('/crush', routes.crushId);

app.listen(PORT, () => { console.log(`Online on port ${PORT}`); });
