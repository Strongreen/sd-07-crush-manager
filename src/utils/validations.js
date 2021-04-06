function validateEmail(email) {
  if (!email) throw new Error('O campo "email" é obrigatório');
  const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!regexEmail.test(email)) {
    throw new Error('O "email" deve ter o formato "email@email.com"');
  }
  return true;
}

function validatePassword(password) {
  if (!password) throw new Error('O campo "password" é obrigatório');
  if (password.length < 6) {
    throw new Error('O "password" deve ter pelo menos 6 caracteres');
  } 
  return true;
}

module.exports = { validateEmail, validatePassword };