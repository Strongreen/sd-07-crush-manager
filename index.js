const express = require('express');
const bodyParser = require('body-parser');
const { readFiles, identifyID, login} = require('./helper');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', readFiles);

app.get('/crush/:id', identifyID);

app.get('/login', login);

app.listen(PORT, () => { console.log('Online'); });
