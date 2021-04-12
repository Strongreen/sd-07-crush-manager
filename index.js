const express = require('express');
const bodyParser = require('body-parser');
const Crushes = require('./routes/Crush');
const Login = require('./routes/Login');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use('/crush', Crushes);
app.use('/login', Login);

app.listen(PORT, () => { console.log('Online'); });
