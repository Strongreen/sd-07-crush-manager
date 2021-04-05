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

module.exports = {
  getAllCrushes,
  getCrush,

};
