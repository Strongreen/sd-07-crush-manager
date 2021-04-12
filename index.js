const express = require('express');
const bodyParser = require('body-parser');
const crush = require('./routes/crush');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
/* const FAIL = 400;
const FAIL_SERVER = 500; */
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_req, res) => {
  res.status(SUCCESS).send(
    {
      message: 'Para saber se voce logou mesmo meu chapa!',
    },
  );
});

app.use('/crush', crush);

app.listen(PORT, () => { console.log('O Pai ta on na Porta 3000'); });
