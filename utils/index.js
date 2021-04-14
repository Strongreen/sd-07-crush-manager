const fs = require('fs');

async function getCrushs() {
  const crushs = await fs.promises.readFile(`${__dirname}/../crush.json`);  
  return JSON.parse(crushs.toString('utf-8'));
}

async function saveData(data) {
  await fs.promises.writeFile(`${__dirname}/../crush.json`, JSON.stringify(data));    
}

function filterCrush(id, data) {
  return data.filter((crush) => crush.id !== Number(id));
}

async function getCrushById(id) {   
  const crushsList = await getCrushs();  
  const resultFoundCrush = crushsList.find((crush) => crush.id === Number(id));
  return resultFoundCrush;
}

function getByIndexCrush(id, data) {    
  const index = data.findIndex((crush) => crush.id === Number(id));    
  return index;
}

function getListCrushByName(term, data) {  
  return data.filter((crush) => crush.name.includes(term.q));
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
  generateToken,
  getByIndexCrush,
  saveData,
  filterCrush,
  getListCrushByName,
};