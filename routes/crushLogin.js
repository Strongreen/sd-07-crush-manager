const crypto = require('crypto');

function validEmail(email, response) {
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.com$/;
  if (!email) {
    return response.status(400).send({
     message: 'O campo "email" é obrigatório',
    });
  }
  
  if (!regexEmail.test(email)) {
    return response.status(400).send({ 
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
}

function validPass(password, response) {
  let passwordString = '';
  if (password) { passwordString = password.toString(); }
  if (passwordString === '' || passwordString === undefined) {
    return response.status(400).send({
      message: 'O campo "password" é obrigatório',
    });
  }
  
  if (passwordString.length < 6) {
    return response.status(400).send({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }
}

function tokenGenerator(response) {
  const token = crypto.randomBytes(8).toString('hex');
  return response.status(200).send({ token });
}

function crushLoginFunction(request, response) {
  const { email, password } = request.body;
  validEmail(email, response);
  validPass(password, response);
  tokenGenerator(response);
}

module.exports = { crushLoginFunction };