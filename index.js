const express = require('express');
const fs = require('fs').promises;

const app = express();
app.use(express.json());

const SUCCESS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.listen(PORT, () => { console.log('Online'); });

const crushList = './crush.json';
const crushId = '/crush/:id';

app.get(crushList, async (req, res) => {
  const empty = [];
  const myCrush = await fs.readFile(crushList, 'utf8');
  const newListCrush = JSON.parse(myCrush);
  if (newListCrush) {
    return res.status(SUCCESS).json(newListCrush);
  }
  
  return empty;
});

app.get(crushId, async (req, res) => {
  const myCrush = await fs.readFile(crushList, 'utf8');
  const id = Number(req.params.id);
  const crushJson = JSON.parse(myCrush);
  const idCrush = await crushJson.find((crush) => crush.id === id);
  if (idCrush) {
    return res.status(SUCCESS).json(idCrush);
  }
  return res.status(404).json({
    message: 'Crush não encontrado',
  });
});

/* async function test () {
  const result = await read();
  console.log(result[0]);
} */

// test();

/* const emailValidation = (email) => {
  const rejexForEmail = /^[^\s@]+@[^\s@]+$/;
  return rejexForEmail.test(email);
}

const passwordValidation = (password) => {
  const rejexForPassword = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  return rejexForPassword.test(password);
}

const token = (req, res, next) => {
  const { authorization } = req.headers;

  if( authorization.length !== 16 ) {
     return res.status(401).json({
      message: 'Token inválido',
    });
  }

  next();
} */ 