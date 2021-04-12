const fs = require('fs');

const minimumPasswordLength = 6;

async function getCrushs() {
  const crushs = await fs.promises.readFile(`${__dirname}/../crush.json`);  
  return JSON.parse(crushs.toString('utf-8'));
}

function validateEmail(email) {
  const regexEmail = /\S+@\S+\.\S+/;
  return regexEmail.test(email);
}

function validatePassword(password) {
  console.log('tamanho: ', password.length);
  if (password.length < minimumPasswordLength) return false;
  return true; 
}

function generateToken() {
  let result = '';
  for (let i = 1; i <= 8; i += 1) {
    result += (Math.floor(Math.random() * 256)).toString(16);    
  }
  
  return result;
}

async function getCrushById(id) {   
  const crushsList = await getCrushs();  
  const resultFoundCrush = crushsList.find((crush) => crush.id === Number(id));
  return resultFoundCrush;
}

module.exports = { 
  getCrushs,
  getCrushById,
  generateToken, 
  validateEmail,
  validatePassword,
};