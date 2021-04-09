const express = require('express');
const bodyParser = require('body-parser');
const { crushFunction } = require('./routes/crush');
const { crushIdFunction } = require('./routes/crushId');
const { crushLoginFunction } = require('./routes/crushLogin');
const { validPassFunction } = require('./valid/validPass');
const { validEmailFunction } = require('./valid/validEmail');
const { crushAddFunction } = require('./routes/crushAdd');
const { validTokenFunction } = require('./valid/validToken');
const { validNameFunction, validAgeFunction } = require('./valid/validCrush');
const { validDateFunction,
  validRateFunction,
  validDatedAtFunction,
} = require('./valid/validCrushDate');
const { crushAddIdFunction } = require('./routes/crushAddId');
const { crushDeleteFunction } = require('./routes/crushDelete');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});
const crushIdPath = '/crush/:id';

app.get('/crush', crushFunction);

app.get(crushIdPath, crushIdFunction);

app.post('/login', validEmailFunction, validPassFunction, crushLoginFunction);

app.post('/crush', 
  validTokenFunction,
  validNameFunction,
  validAgeFunction, 
  validDateFunction,
  validRateFunction,
  validDatedAtFunction,
  crushAddFunction);

app.put(crushIdPath, 
  validTokenFunction,
  validNameFunction,
  validAgeFunction,
  validDateFunction,
  validRateFunction,
  validDatedAtFunction,
  crushAddIdFunction);

app.delete(crushIdPath,
  validTokenFunction,
  crushDeleteFunction);

app.listen(PORT, () => { console.log('Online'); });
