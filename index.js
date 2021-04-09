const express = require('express');
const bodyParser = require('body-parser');
const crush = require('./routes/crush');
const crushId = require('./routes/crushId');
const crushLogin = require('./routes/crushLogin');
const validPass = require('./valid/validPass');
const validEmail = require('./valid/validEmail');
const crushAdd = require('./routes/crushAdd');
const validToken = require('./valid/validToken');
const validCrush = require('./valid/validCrush');
const validDate = require('./valid/validCrushDate');
const crushAddId = require('./routes/crushAddId');

const { crushFunction } = crush;
const { crushIdFunction } = crushId;
const { crushLoginFunction } = crushLogin;
const { validEmailFunction } = validEmail;
const { validPassFunction } = validPass;
const { crushAddFunction } = crushAdd;
const { validTokenFunction } = validToken;
const { validNameFunction, validAgeFunction } = validCrush;
const { validDateFunction, validRateFunction, validDatedAtFunction } = validDate;
const { crushAddIdFunction } = crushAddId;

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

app.post('/login', validEmailFunction, validPassFunction, crushLoginFunction);

app.post('/crush', 
  validTokenFunction,
  validNameFunction,
  validAgeFunction, 
  validDateFunction,
  validRateFunction,
  validDatedAtFunction,
  crushAddFunction);

app.put('/crush/:id', 
  validTokenFunction,
  validNameFunction,
  validAgeFunction,
  validDateFunction,
  validRateFunction,
  validDatedAtFunction,
  crushAddIdFunction);

app.listen(PORT, () => { console.log('Online'); });
