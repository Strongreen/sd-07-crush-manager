const express = require('express');
const bodyParser = require('body-parser');
const crush = require('./routes/crush');
const crushId = require('./routes/crushId');

const { crushFunction } = crush;
const { crushIdFunction } = crushId;  

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', crushFunction);

app.get('/crush/:id', crushIdFunction);

app.listen(PORT, () => { console.log('Online'); });
