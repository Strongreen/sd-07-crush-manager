const express = require('express');
const crush = require('./routes/index');
const middlewares = require('./middlewares/index');

const app = express();
app.use(express.json());

const SUCCESS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use(middlewares.validationMiddleware);
app.use('/crush', crush);

app.listen(PORT, () => { console.log('Online'); });
