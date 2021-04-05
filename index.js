const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());

app.use(routes);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => console.log('Ta rodando carai!'));
