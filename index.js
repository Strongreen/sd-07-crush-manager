const express = require('express');
/* const bodyParser = require('body-parser'); */
const crushRouter = require('./routers');

const app = express();
/* app.use(bodyParser.json()); */
app.use(express.json());

const PORT = 3000;

/* não remova esse endpoint, é para o avaliador funcionar */
app.get('/', (_req, res) => {
  res.status(200).send(
    {
      message: 'Só para voce saber amigo, ta logado; server ok',
    },
  );
});

app.use('/', crushRouter);

app.listen(PORT, () => { console.log('Online'); });
