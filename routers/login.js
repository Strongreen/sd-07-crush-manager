const { Router } = require('express');

const loginRouter = Router();
const { genRanHex } = require('../helpers');
const status = require('../helpers/status');

// 3.  Crie o endpoint POST /login

loginRouter.post('/', (_request, response) => {
  const newToken = genRanHex(16);
  response.setHeader('authorization', newToken);
  response.status(status.SUCCESS).json({ token: newToken });
});

module.exports = loginRouter;
