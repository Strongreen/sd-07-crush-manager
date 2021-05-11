const express = require('express');
const bodyParser = require('body-parser');
const crush = require('./routes/crush.js');
const login = require('./routes/login.js');
const MIDDLEWARES = require('./middlewares/index.js');

const app = express();
app.use(bodyParser.json());
app.use('/login', login);
app.use('/crush', crush);
app.use(MIDDLEWARES.errorMiddleware);

const SUCCESS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.listen(PORT, () => { console.log('Online'); });
