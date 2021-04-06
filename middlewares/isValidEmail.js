const { emailValid } = require('../services');

const emailIs = {
  empy: 'O campo "email" é obrigatório',
  invalid: 'O "email" deve ter o formato "email@email.com"',
};

const FAIL = 400;

function isValidEmail(request, response, next) {
  const { email } = request.body || '';
  const isEmpy = !email;

  if (isEmpy) {
    response.status(FAIL).send({ message: emailIs.empy });
  } else if (!emailValid(email)) {
    response.status(FAIL).send({ message: emailIs.invalid });
  }

  next();
}

module.exports = isValidEmail;
