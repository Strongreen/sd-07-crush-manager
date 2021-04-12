const fs = require('fs');

async function getCrushs() {
  const crushs = await fs.promises.readFile(`${__dirname}/../crush.json`);  
  return JSON.parse(crushs.toString('utf-8'));
}

async function getCrushById(id) {   
  const crushsList = await getCrushs();  
  const resultFoundCrush = crushsList.find((crush) => crush.id === Number(id));
  console.log(resultFoundCrush);
  return resultFoundCrush;
}

module.exports = { getCrushs, getCrushById };