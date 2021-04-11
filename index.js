const express = require('express');
const err = require('./middlewares/errMiddlewares');
const crush = require('./routes/crush');

const app = express();

app.use(express.json());

const SUCCESS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use('/crush', crush);

app.use(err);

app.listen(PORT, () => { console.log('Online'); });
