const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./src/routes');

const app = express();
app.use(bodyParser.json());
app.use(routes); 

const SUCCESS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.listen(PORT, () => { console.log('Online'); });
