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

function nameValidation(name) {
  if (!name) throw new Error('O campo "name" é obrigatório');
  if (name.length < 3) {
    throw new Error('O "name" deve ter pelo menos 3 caracteres');
  }
  return true;
}

function ageValidation(age) {
  if (!age) throw new Error('O campo "age" é obrigatório');
  if (age < 18) throw new Error('O crush deve ser maior de idade');
  return true;
}

function dateValidation(date) {
  if (!date) {
    throw new Error('O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios');
  }
  const regexDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
  if (!regexDate.test(date)) {
    throw new Error('O campo "datedAt" deve ter o formato "dd/mm/aaaa"');
  }
  return true;
}

function rateValidation(rate) {
  if (!rate) {
    throw new Error('O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios');
  }
  if (!(rate >= 1 && rate <= 5)) {
    throw new Error('O campo "rate" deve ser um inteiro de 1 à 5');
  }
  return true;
}

module.exports = {
  validateEmail,
  validatePassword,
  nameValidation,
  ageValidation,
  dateValidation,
  rateValidation,
};
