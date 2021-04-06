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

const crushList = '/crush';
const crushId = '/crush/:id';
app.listen(PORT, () => { console.log('Online'); });

 const emailValidation = (email) => {
  const rejexForEmail = /^[^\s@]+@[^\s@]+$/;
  return rejexForEmail.test(email);
};

const passwordValidation = (password) => {
  const rejexForPassword = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  return rejexForPassword.test(password);
};

const authorizationEmail = (req, res, next) => {
  const { email } = req.body;
  if (!email || email === '') {
    return res.status(400).json({
      message: 'O campo "email" é obrigatório',
  });
  }

  const validEmail = emailValidation(email);
  if (!validEmail) {
    return res.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }

  next();
};

app.get(crushList, async (_req, res) => {
  const myCrush = await fs.readFile('./crush.json', 'utf8');
  const newListCrush = JSON.parse(myCrush);
  return res.status(SUCCESS).json(newListCrush);
});

app.get(crushId, async (req, res) => {
  const myCrush = await fs.readFile('./crush.json', 'utf8');
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

app.post('/login', authorizationEmail, (req, res) => {
  const { password } = req.body;
  if (!password || password === '') {
    return res.status(400).json({
      message: 'O campo "password" é obrigatório',
    });
  }
  passwordValidation(password);
  if (!password || password.length < 6) {
    return res.status(400).json({
      message: 'A "senha" deve ter pelo menos 6 caracteres',
    });
  }

   return res.status(SUCCESS).json({
    token: '7mqaVRXJSp886CGr',
  });
});
