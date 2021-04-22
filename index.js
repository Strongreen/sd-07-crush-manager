const express = require('express');
const crushRouter = require('./routers/crushRouter');

const app = express();
app.use(express.json());
app.use(crushRouter);

const PORT = 3000;

/* não remova esse endpoint, é para o avaliador funcionar */
app.get('/', (_req, res) => {
  res.status(200).send(
    {
      message: 'Só para voce saber amigo, ta logado; server ok',
    },
  );
});

app.listen(PORT, () => {
  console.log(`O Pai ta ON na Porta ${PORT}`); 
});
