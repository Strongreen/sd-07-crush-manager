const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const crypto = require('crypto');
/* const dataArr = require('./crush.json'); */

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const FAIL = 400;
const FAIL_2 = 404;

/* const POST_SUCCESS = 201; */
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
  return res.status(FAIL_2).send({ message: 'Crush não encontrado' });
});

/* Requisito 3 */
function validEmail(email) {
  const reGex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    return {
      error: true,
      message: 'O campo "email" é obrigatório',
    };
  }

  if (!reGex.test(email)) {
    return {
      error: true,
      message: 'O "email" deve ter o formato "email@email.com"',
    };
  }

  return { error: false };
}

function validPass(password) {
  if (!password) {
    return {
      error: true,
      message: 'O campo "password" é obrigatório',
    };
  }
  if (String(password).length < 6) {
    return {
      error: true,
      message: 'A "senha" deve ter pelo menos 6 caracteres',
    };
  }
  return { error: false };
}

app.post('/login', (req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  const { email, password } = req.body;
  try {
    const validEmailResult = validEmail(email);
    if (validEmailResult.error) {
      return res.status(FAIL).json({ message: validEmailResult.message });
    }
    const validPasswordResult = validPass(password);
    if (validPasswordResult.error) {
      return res.status(FAIL).json({ message: validPasswordResult.message });
    }
    return res.status(SUCCESS).json({ token });
  } catch (error) {
    res.status(INTERNAL_ERROR).send({ message: 'ta zuado o role' });
  }
});

/* Requisito 4 */
/* app.post('/crush', async (req, res) => {
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
}); */

app.listen(PORT, () => { console.log('O Pai ta ON na Porta 3000'); });
