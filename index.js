const express = require('express');
const bodyParser = require('body-parser');
// const crushes = require('./crush.json');
const crushRoutes = require('./routes/crush.js');
const loginRoutes = require('./routes/login.js');
const loginMiddleware = require('./middlewares/loginValidations')

const app = express();

app.use(bodyParser.json());
app.use(loginMiddleware);

const SUCCESS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use('/crush', crushRoutes);
app.use('/login', loginRoutes);

app.listen(PORT, () => { console.log('Online'); });
