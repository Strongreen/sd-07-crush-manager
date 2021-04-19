const fs = require('fs');

function nullOrEmpty(value) {
  if (!value || value === '') return true;
  return false;
}

function checkEmail(email) {
  const mailFormat = /\b[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}\b/g;

  if (nullOrEmpty(email)) {
    throw new Error('O campo "email" é obrigatório');
  }

  if (!email.match(mailFormat)) {
    throw new Error('O "email" deve ter o formato "email@email.com"');
  }
}

function checkPassword(password) {
  if (nullOrEmpty(password)) {
    throw new Error('O campo "password" é obrigatório');
  }

  if (password.toString().length < 6) {
    throw new Error('A "senha" deve ter pelo menos 6 caracteres');
  }
}

const getCrushOnFile = async () => {
  const file = await fs.promises.readFile('./crush.json', 'utf-8');
  return JSON.parse(file);
};

module.exports = { nullOrEmpty, checkEmail, checkPassword, getCrushOnFile };
