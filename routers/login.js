const { Router } = require('express');

const loginRouter = Router();
const { validEmail, genRanHex } = require('../helpers');
const status = require('../helpers/status');

// 3.  Crie o endpoint POST /login

loginRouter.post('/', (request, response) => {
  const { email, password } = request.body;

  if (!email) return response.status(status.BAD_REQUEST).json({ message: 'O campo "email" é obrigatório' });

  if (!validEmail(email)) return response.status(status.BAD_REQUEST).json({ message: 'O "email" deve ter o formato "email@email.com"' });

  if (!password) return response.status(status.BAD_REQUEST).json({ message: 'O campo "password" é obrigatório' });

  if (password.length < 6) return response.status(status.BAD_REQUEST).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  /*   console.log(password);
    console.log(password.length); */
  const newToken = genRanHex(16);

  response.setHeader('authorization', newToken);
  // const isToken = verifyToken(token);
  response.status(status.SUCCESS).json({ token: newToken });
});

module.exports = loginRouter;
