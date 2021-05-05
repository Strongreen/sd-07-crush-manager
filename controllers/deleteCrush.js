const { readFile } = require('../services/readAndWrite');

const deleteCrush = async (id, name, age, date) => {
const result = readFile();
  const updatedCrushList = result.map((elem) => {
   if (id === elem.id) return { id, name, age, date };
   return elem;
  }).find((curr) => id === curr.id);
  return updatedCrushList;
}; 

module.exports = deleteCrush;