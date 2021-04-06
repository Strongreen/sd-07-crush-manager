const SUCCESS = 200;
const BAD_REQUEST = 400;
// const NOT_FOUND = 404;
// const INTERNAL_SERVER_ERROR = 500;

const rescue = require('express-rescue');
const { generateToken } = require('../services/GenerateToken');

function passwordIsValid(password) {
  if (!password) {
    throw new Error('O campo "password" é obrigatório');
  }

  if (password.length < 6) {
    throw new Error('A "senha" deve ter pelo menos 6 caracteres');
  }
}

function emailIsValid(email) {
  if (!email) {
    throw new Error('O campo "email" é obrigatório');
  }

  // REGEX retirado de:
  // https://stackoverflow.com/questions/52456065/how-to-format-and-validate-email-node-js/52456632
  // https://stackoverflow.com/questions/12317049/how-to-split-a-long-regular-expression-into-multiple-lines-in-javascript
  const emailRegex = new RegExp([
    /^[-!#$%&'*+\\/0-9=?A-Z^_a-z{|}~]/,
    /(\.?[-!#$%&'*+\\/0-9=?A-Z^_a-z`{|}~])*/,
    /@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/,
  ].map((r) => r.source).join(''));

  if (!emailRegex.test(email)) {
    throw new Error('O "email" deve ter o formato "email@email.com"');
  }
}

const login = rescue(async (req, res) => {
  const { email, password } = req.body;
  try {
    emailIsValid(email);
    passwordIsValid(password);
    res.status(SUCCESS).json({ token: generateToken(8) });
  } catch (error) {
    return res.status(BAD_REQUEST).json({ message: error.message });
  }
});

module.exports = login;
