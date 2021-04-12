const fs = require('fs');

const crushPath = './crush.json';

function generateToken(length) {
  const a = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split(
    '',
  );
  const b = [];
  for (let i = 0; i < length; i += 1) {
    const j = (Math.random() * (a.length - 1)).toFixed(0);
    b[i] = a[j];
  }
  return b.join('');
}

function validateEmail(email) {
  if (email === '' || email === undefined) {
    throw new Error('O campo "email" é obrigatório');
  }
  const regex = /\S+@\S+\.\S+/;
  const validFormat = regex.test(email);
  if (!validFormat) {
    throw new Error('O "email" deve ter o formato "email@email.com"');
  }
}

function validatePassword(password) {
  if (password === '' || password === undefined) {
    throw new Error('O campo "password" é obrigatório');
  }
  if (password.length < 6) {
    throw new Error('A "senha" deve ter pelo menos 6 caracteres');
  }
}

function validateToken(token) {
  if (token === undefined) {
    throw new Error('Token não encontrado');
  }
  if (token.length < 16) {
    throw new Error('Token inválido');
  }
}

function validateName(name) {
  if (name === '' || name === undefined) {
    throw new Error('O campo "name" é obrigatório');
  }
  if (name.length < 3) {
    throw new Error('O "name" deve ter pelo menos 3 caracteres');
  }
}

function validateAge(age) {
  if (age === '' || age === undefined) {
    throw new Error('O campo "age" é obrigatório');
  }
  if (age < 18) {
    throw new Error('O crush deve ser maior de idade');
  }
}

function validateForm(date) {
  const dateReg = /^\d{2}[/]\d{2}[/]\d{4}$/;
  const { datedAt, rate } = date;
  const dataIsOk = dateReg.test(datedAt);
  if (!dataIsOk) {
    throw new Error('O campo "datedAt" deve ter o formato "dd/mm/aaaa"');
  }
  if (rate < 1 || rate > 5 || !Number.isInteger(rate)) {
    throw new Error('O campo "rate" deve ser um inteiro de 1 à 5');
  }
}

function validateDate(date) {
  if (
    date === undefined
    || date.datedAt === undefined
    || date.rate === undefined
  ) {
    throw new Error(
      'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    );
  }
  validateForm(date);
}

function createCrush(addCrush) {
  const newCrush = addCrush;
  const { name, age, date } = newCrush;
  validateName(name);
  validateAge(age);
  validateDate(date);

  const crushes = JSON.parse(fs.readFileSync(crushPath, 'utf8'));
  let biggerId = 0;
  for (let index = 0; index < crushes.length; index += 1) {
    if (crushes[index].id > biggerId) biggerId = crushes[index].id;
  }
  
  newCrush.id = biggerId + 1;
  crushes.push(newCrush);
  fs.writeFileSync(crushPath, JSON.stringify(crushes));
  return newCrush;
}

function editCrush(addCrush, id) {
  const newCrush = addCrush;
  const { name, age, date } = newCrush;
  validateName(name);
  validateAge(age);
  validateDate(date);

  const crushes = JSON.parse(fs.readFileSync(crushPath, 'utf8'));
  crushes.filter((crush) => crush.id !== id);
  newCrush.id = parseInt(id, 10);
  crushes.push(newCrush);
  fs.writeFileSync(crushPath, JSON.stringify(crushes));
  return newCrush;
}

function deleteCrush(id) {
  const crushes = JSON.parse(fs.readFileSync(crushPath, 'utf8'));
  crushes.filter((crush) => crush.id !== id);
  fs.writeFileSync(crushPath, JSON.stringify(crushes));
}

function searchCrush(query) {
  const crushes = JSON.parse(fs.readFileSync(crushPath, 'utf8'));
  crushes.filter((crush) => crush.name.includes(query));
  fs.writeFileSync(crushPath, JSON.stringify(crushes));
}

module.exports = {
  generateToken,
  validateEmail,
  validatePassword,
  validateToken,
  createCrush,
  editCrush,
  deleteCrush,
  searchCrush,
};
