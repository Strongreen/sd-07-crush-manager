const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes');
const STATUSCODE = require('./statusCode.json');

const app = express();
app.use(bodyParser.json());

const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(STATUSCODE.SUCCESS).send();
});

app.use('/crush', routes.getAllCrushes);
app.use('/crush', routes.getCrushById);

app.listen(PORT, () => { console.log('Online'); });
