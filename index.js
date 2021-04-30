const express = require('express');
const bodyParser = require('body-parser');
const crushRoute = require('./routes/crush');
const loginRoute = require('./routes/login');
// const authMiddleware = require('./middlewares/login');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = '3000';

app.use('/login', loginRoute);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use('/crush', crushRoute);

app.listen(PORT, () => { console.log('Online'); });
