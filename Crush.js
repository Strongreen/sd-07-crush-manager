const fs = require('fs');
const crushes = require('./crush.json');

const getAllCrushes = () => {
  if (crushes.length === 0) {
    return [];
  }

  return crushes;
};

const getCrush = (id) => {
  const idToFind = Number(id);
  
  const crush = crushes.filter((element) => element.id === idToFind);

  return crush;
};

const createCrush = (infoCrush) => {
  const { name, age, date } = infoCrush;
  const size = crushes.length;
  const newCrush = {
    id: crushes[size - 1].id + 1,
    name,
    age,
    date,
  };
  crushes.push(newCrush);

  try {
    fs.promises.writeFile('./crush.json', JSON.stringify(crushes));
  } catch (error) {
    throw new Error('Erro ao salvar no arquivo!');
  }
  
  return newCrush;
};

module.exports = {
  getAllCrushes,
  getCrush,
  createCrush,  
};
