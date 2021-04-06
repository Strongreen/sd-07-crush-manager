const express = require('express');
const bodyParser = require('body-parser');
const readFileMiddleware = require('./Middlewares/readFileMiddleware');

const indentifyIDMiddleware = require('./Middlewares/indentifyIDMiddleware');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', readFileMiddleware);

app.get('/crush/:id', indentifyIDMiddleware);

app.listen(PORT, () => { console.log('Online'); });
