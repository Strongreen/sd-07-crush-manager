const express = require('express');
const crushRouters = require('./src/routes');

const app = express();
app.use(express.json());

const SUCCESS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use(crushRouters);

app.listen(3000, () => console.log('listening on port 3000'));
