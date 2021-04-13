const express = require('express');
const crush = require('./routes/crush');
const crushId = require('./routes/crushId');
const crushLogin = require('./routes/crushLogin');

const app = express();
app.use(express.json());
app.use('/login', crushLogin);
app.use('/crush', crush);
app.use('/crush', crushId);

const SUCCESS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.listen(PORT, () => { console.log('Online'); });
