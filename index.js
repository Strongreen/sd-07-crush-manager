const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use('/login', require('./routes/login'));
app.use('/crush', require('./routes/crush'));

app.listen(PORT, () => { console.log('Online'); });
