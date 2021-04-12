const express = require('express');
const bodyParser = require('body-parser');
const crushRouters = require('./src/routes');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use(crushRouters);

/* app.get('/crush', crushController.getCrushes); */

app.listen(PORT, () => { console.log(`Online, Ouvindo porta ${PORT}!`); });
