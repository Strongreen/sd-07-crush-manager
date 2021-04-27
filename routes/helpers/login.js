const crypto = require('crypto');

const tokenGenerator = () => crypto.randomBytes(8).toString('hex');
const emailValid = (email) => {
  const expectedPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return email && expectedPattern.test(email) && email !== '';
};
const emailValidator = (email) => {
  const expectedPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || email === '') {
    throw new Error('O campo "email" é obrigatório');
    // console.log('O campo "email" é obrigatório');
  }
  if (!expectedPattern.test(email)) {
    throw new Error('O "email" deve ter o formato "email@email.com"');
    // console.log('O "email" deve ter o formato "email@email.com"');
  }
  emailValid(email);
  // console.log('entrou na função');
};

const passwordValidator = (password) => {
  if (!password || password === '') {
    throw new Error('O campo "password" é obrigatório');
  }
  if (password.length < 6) {
    throw new Error('A "senha" deve ter pelo menos 6 caracteres');
  }
  return password;
};

module.exports = { tokenGenerator, emailValidator, passwordValidator };