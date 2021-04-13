const fs = require('fs');
const message = require('../messages/messages');

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

function isValidateEmail(email) {  
  if (!email) throw new Error(JSON.stringify(message.emailRequired));

  const regexEmail = /\S+@\S+\.\S+/;

  if (!regexEmail.test(email)) {
    throw new Error(JSON.stringify(message.emailInvalid));
  }
}

function isValidatePassword(password) { 
  if (!password) throw new Error(JSON.stringify(message.passwordRequired)); 

  if (password.length < minimumPasswordLength) {
    throw new Error(JSON.stringify(message.passwordInvalid));
  }
}

function isValidateToken(token) {
  if (!token) throw new Error(JSON.stringify(message.tokenRiquired)); 

  if (token.length < minimumTokenLength) {
    throw new Error(JSON.stringify(message.tokenInvalid));
  }
}

function isValidateName(name) {
  if (!name) throw new Error(JSON.stringify(message.nameRequired)); 

  if (name.length < minimumNameLength) {
    throw new Error(JSON.stringify(message.nameInvalid));
  }
}

function isValidateAge(age) {
  if (!age) throw new Error(JSON.stringify(message.ageRequired)); 

  if (age < minimumAgeLength) {    
    throw new Error(JSON.stringify(message.ageInvalid));
  }
}

function isValidateDate(date) {
  const { datedAt } = date;

  if (!datedAt) {
    throw new Error(JSON.stringify(message.dateAndRateRequired));
  }  

  const dateRegex = /^\d\d[/]\d\d[/]\d\d\d\d$/;  

  if (!(dateRegex.test(datedAt))) {
    throw new Error(JSON.stringify(message.dateInvalid));
  }  
}

function isValidateRate(date) {
  const { rate } = date;

  if (rate <= 0 || rate > 5) {
    console.log('entrei aqui 1 - 5');
    throw new Error(JSON.stringify(message.rateInvalid));
  }

  if (!rate) {
    console.log('entrei aqui rate vazio');
    throw new Error(JSON.stringify(message.dateAndRateRequired));
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
  isValidateEmail,
  isValidatePassword,
  isValidateToken,
  isValidateName,
  isValidateAge,
  isValidateDate,
  isValidateRate,
  generateToken,
  saveData,
};