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

require('./Endpoints/exercise1')(app);
require('./Endpoints/exercise2')(app);
require('./Endpoints/exercise3')(app);
require('./Endpoints/exercise4')(app);

app.listen(PORT, () => { console.log('Online'); });
