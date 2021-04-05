function validateEmail(email) {
  if (
    email === ''
    || !email
  ) throw new Error('O campo "email" é obrigatório');

  const emailRegex = /[a-z]+[._-]?[a-z]*@[a-z]+\.\w{2,4}$/;
  const isValid = emailRegex.test(email);

  if (!isValid) throw new Error('O "email" deve ter o formato "email@email.com"');

  return true;
}

function validatePassword(password) {
  if (
    password === ''
    || !password
  ) throw new Error('O campo "password" é obrigatório');

  if (password.length < 6) throw new Error('A "senha" deve ter pelo menos 6 caracteres');

  return true;
}

function validateLoginMiddleware(request, _response, next) {
  const { email, password } = request.body;

  if (validateEmail(email) && validatePassword(password)) {
    next();
  }
}

module.exports = validateLoginMiddleware;
