const express = require('express');
const crush = require('./routes/crush');

const app = express();

const SUCCESS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use(express.json());

app.use('/crush', crush);
app.listen(PORT, () => { console.log('Online'); });
