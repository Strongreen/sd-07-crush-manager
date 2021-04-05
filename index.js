const express = require('express');
const crush = require('./routes/crush');
const login = require('./routes/login');

const app = express();
const SUCCESS = 200;
const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.use(express.json());
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use('/crush', crush);
app.use('/login', login);

app.listen(PORT, () => {
  console.log(`Aplicação rodando na porta ${PORT}`);
});
