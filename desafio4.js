const express = require('express');
const fs = require('fs').promises;
const helpers = require('./helper/validateCreate');

const app = express();

const handleError = async (error) => {
  if (
    error.message === 'Token inválido' 
    || error.message === 'Token não encontrado'
  ) {
    return 401;
  }
  return 400;
};

app.post('/crush', async (req, res) => {
  try {
    const crush = JSON.parse(await fs.readFile('./crush.json'));
    const tokenIsValid = helpers.validateToken(req.headers.authorization);

    if (tokenIsValid) {
      const newCrush = helpers.validateCreate(crush, req.body);

      const size = newCrush.length;
      await fs.writeFile('./crush.json', JSON.stringify(newCrush));
      res.status(201).json(newCrush[size - 1]);
    }
  } catch (error) {
    const teste = await handleError(error);
    return res.status(teste).json({
      message: error.message,
    });
  }
});

module.exports = app;
