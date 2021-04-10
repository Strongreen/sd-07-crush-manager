const { passwordValid } = require('../services');

const passwordIs = {
  empy: 'O campo "password" é obrigatório',
  invalid: 'A "senha" deve ter pelo menos 6 caracteres',
};

const FAIL = 400;

function isValidPassword(request, response, next) {
  const { password } = request.body || '';
  const isEmpy = !password;

  if (isEmpy) {
    response.status(FAIL).send({ message: passwordIs.empy });
  } else if (!passwordValid(password)) {
    response.status(FAIL).send({ message: passwordIs.invalid });
  } else {
    next();
  }
}

module.exports = isValidPassword;
