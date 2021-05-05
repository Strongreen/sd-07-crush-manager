const fs = require('fs').promises;

const deleteCrush = async (id, name, age, date) => {
  const datas = await fs.readFile(`${__dirname}/../crush.json`, 'utf-8');
  const dataParse = JSON.parse(datas);
  const updatedCrushList = dataParse.map((elem) => {
   if (id === elem.id) return { id, name, age, date };
   return elem;
  }).find((curr) => id === curr.id);
  return updatedCrushList;
}; 

module.exports = deleteCrush;