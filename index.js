const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const FAIL = 404;
/* const FAIL_SERVER = 500; */
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_req, res) => {
  res.status(SUCCESS).send(
    {
      message: 'Só para voce saber amigo, ta logado; server ok',
    },
  );
});

app.get('/crush', (_req, res) => {
  const data = JSON.parse(fs.readFileSync('./crush.json', 'utf8'));
  if (data.length === 0) {
    return res.status(200).send([]);
  }
    res.status(200).send(data);
});

app.get('/crush/:id', (req, res) => {
  const data2 = JSON.parse(fs.readFileSync('./crush.json', 'utf8'));
  console.log(data2);
  const { id } = req.params;
  const crushId = parseInt(id, data2.length);
  const crushFind = data2.find((crush) => crush.id === crushId);
  if (crushFind) res.status(SUCCESS).send(crushFind);
    return res.status(FAIL).send({ message: 'Crush não encontrado' });
  });

app.listen(PORT, () => { console.log('O Pai ta ON na Porta 3000'); });
