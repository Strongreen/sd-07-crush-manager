const express = require('express');

const app = express();
const SUCCESS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

const routerCrush = require('./router/routerCrush');
const routerLogin = require('./router/routerLogin');
const routerSearchCrush = require('./router/routerSearchCrush');

app.use(express.json());
app.use('/crush/search', routerSearchCrush);
app.use('/crush', routerCrush);
app.use('/login', routerLogin);

app.listen(3000, () => console.log('Servidor rodando no caminho http://localhost:3000'));
