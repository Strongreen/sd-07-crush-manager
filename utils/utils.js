const fs = require('fs');

const minimumNameLength = 3;
const minimumPasswordLength = 6;
const minimumTokenLength = 16;
const minimumAgeLength = 18;

async function getCrushs() {
  const crushs = await fs.promises.readFile(`${__dirname}/../crush.json`);  
  return JSON.parse(crushs.toString('utf-8'));
}

async function saveData(data) {
  await fs.promises.writeFile(`${__dirname}/../crush.json`, JSON.stringify(data));    
}

async function getCrushById(id) {   
  const crushsList = await getCrushs();  
  const resultFoundCrush = crushsList.find((crush) => crush.id === Number(id));
  return resultFoundCrush;
}

async function getCrushByName(data, name) {  
  const crushObj = data.find((crush) => crush.name === name);  
  return crushObj;
}

function getByIndexCrush(id, data) {    
  const index = data.findIndex((crush) => crush.id === Number(id));    
  return index;
}

function isValidateEmail(email) {  
  if (!email) throw new Error('O campo "email" é obrigatório');

  const regexEmail = /\S+@\S+\.\S+/;

  if (!regexEmail.test(email)) {
    throw new Error('O "email" deve ter o formato "email@email.com"');
  }
}

function isValidatePassword(password) { 
  if (!password) throw new Error('O campo "password" é obrigatório'); 

  if (password.length < minimumPasswordLength) {
    throw new Error('A "senha" deve ter pelo menos 6 caracteres');
  }
}

function isValidateToken(token) {
  if (!token) throw new Error('Token não encontrado'); 

  if (token.length < minimumTokenLength) {
    throw new Error('Token inválido');
  }
}

function isValidateName(name) {
  if (!name) throw new Error('O campo "name" é obrigatório'); 

  if (name.length < minimumNameLength) {
    throw new Error('O "name" deve ter pelo menos 3 caracteres');
  }
}

function isValidateAge(age) {
  if (!age) throw new Error('O campo "age" é obrigatório'); 

  if (age < minimumAgeLength) {    
    throw new Error('O crush deve ser maior de idade');
  }
}

function isValidateDate(body) {
  const { date } = body;

  if (!date || !date.datedAt) {
    throw new Error('O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios');
  }  

  const dateRegex = /^\d\d[/]\d\d[/]\d\d\d\d$/;  

  if (!(dateRegex.test(date.datedAt))) {
    throw new Error('O campo "datedAt" deve ter o formato "dd/mm/aaaa"');
  }  
}

function isValidateRate(date) {
  const { rate } = date;

  if (rate <= 0 || rate > 5) {    
    throw new Error('O campo "rate" deve ser um inteiro de 1 à 5');
  }

  if (!rate) {    
    throw new Error('O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios');
  }
}

function generateToken() {
  let result = '';

  while (result.length < 16) {
    result = '';
    for (let i = 1; i <= 8; i += 1) {
      result += (Math.floor(Math.random() * 256)).toString(16);    
    }  
  }  
  return result;
}

module.exports = { 
  getCrushs,
  getCrushById,
  getCrushByName,
  isValidateEmail,
  isValidatePassword,
  isValidateToken,
  isValidateName,
  isValidateAge,
  isValidateDate,
  isValidateRate,
  generateToken,
  getByIndexCrush,
  saveData,
};