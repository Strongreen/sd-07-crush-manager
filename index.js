const express = require('express');
const routes = require('./routes');
const middlewares = require('./middlewares');

const app = express();

app.use(express.json());

const SUCCESS = 200;
const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.post('/login', middlewares.validateEmail, middlewares.validatePassword);
app.post('/crush', /** middlewares requisito 4 */);
app.use('/crush', routes.crush);
app.use('/crush', routes.crushId);
app.use('/login', routes.login);

app.listen(PORT, () => { console.log(`Online on port ${PORT}`); });
