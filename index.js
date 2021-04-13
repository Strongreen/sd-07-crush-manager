const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const crypto = require('crypto');
const dataArr = require('./crush.json');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const FAIL = 404;
const POST_SUCCESS = 201;
const INTERNAL_ERROR = 500;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_req, res) => {
  res.status(SUCCESS).send(
    {
      message: 'Só para voce saber amigo, ta logado; server ok',
    },
  );
});

/* Requisito 1 */
app.get('/crush', (_req, res) => {
  const data = JSON.parse(fs.readFileSync('./crush.json', 'utf8'));
  if (data.length === 0) {
    return res.status(SUCCESS).send([]);
  }
  res.status(SUCCESS).send(data);
});

/* Requisito 2 */
app.get('/crush/:id', (req, res) => {
  const data2 = JSON.parse(fs.readFileSync('./crush.json', 'utf8'));
  /* console.log(data2); */
  const { id } = req.params;
  const crushId = parseInt(id, 10);
  const crushFind = data2.find((crush) => crush.id === crushId);
  if (crushFind) res.status(SUCCESS).send(crushFind);
  return res.status(FAIL).send({ message: 'Crush não encontrado' });
});

/* Requisito 3 */
app.post('/login', (req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  const reGex = /\S+@\S+\.\S+/;
  const { email } = req.body;
  const { password } = req.body;

  if (email !== '' && reGex.test(email)) {
    if (password !== '' && password.length >= 6) {
      return res.send({ token });
    }
  }
});

/* Requisito 4 */
app.post('/crush', async (req, res) => {
  const crushLength = dataArr.length;
  dataArr[crushLength] = {
    name: req.body.name,
    age: req.body.age,
    id: crushLength + 1,
    date: { datedAt: req.body.date.datedAt, rate: req.body.date.rate },
  };

  try {
    await fs.promises.writeFile(`${__dirname}/./crush.json`, JSON.stringify(dataArr));
    res.status(POST_SUCCESS).send({
      message: 'Salvou essa bagaça',
    });
  } catch (error) {
    res.status(INTERNAL_ERROR).send({ message: 'ta zuado o role' });
  }
});

app.listen(PORT, () => { console.log('O Pai ta ON na Porta 3000'); });
