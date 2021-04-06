function validateEmail(body) {
  const validateE = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!body.email) {
    throw new Error('O campo "email" é obrigatório');
  }
  if (!validateE.test(body.email)) {
    throw new Error('O "email" deve ter o formato "email@email.com"');
  }
  return true;
}

function verifypassword(body) {
  if (!body.password) {
    throw new Error('O campo "password" é obrigatório');
  }

  if (body.password.length < 6) {
    throw new Error('A "senha" deve ter pelo menos 6 caracteres');
  }
  return true;
}

module.exports = { validateEmail, verifypassword };
