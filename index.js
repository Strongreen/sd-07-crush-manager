const express = require('express');
const crushGet = require('./services/getCrush');
const crushPost = require('./services/postCrush');
const login = require('./services/login');
const crushPut = require('./services/putCrush');
const crushDelete = require('./services/deleteCrush');

const app = express();
app.use(express.json());

const SUCCESS = 200;
const PORT = '3000';
const crushRoute = '/crush';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use(crushRoute, crushGet);
app.use(crushRoute, crushPost);
app.use('/', login);
app.use(crushRoute, crushPut);
app.use(crushRoute, crushDelete);

app.listen(PORT, () => {
  console.log('Online');
});
