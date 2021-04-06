const fs = require('fs');

const filePath = './crush.json';

const getAllCrushes = () => {
  const crushFile = fs.readFileSync(filePath, 'utf-8');

  if (crushFile.length === 0) {
    return [];
  }

  return JSON.parse(crushFile);
};

const getCrush = (id) => {
  const idToFind = Number(id);
  const file = fs.readFileSync(filePath, 'utf-8');
  const crushes = JSON.parse(file);
  
  const crush = crushes.filter((element) => element.id === idToFind);

  return crush;
};

const createCrush = (infoCrush) => {
  const { name, age, date } = infoCrush;
  const file = fs.readFileSync(filePath, 'utf-8');
  const crushes = JSON.parse(file);  
  const size = crushes.length;
  const newCrush = {
    id: crushes[size - 1].id + 1,
    name,
    age,
    date,
  };
  crushes.push(newCrush);

  fs.writeFileSync(filePath, JSON.stringify(crushes));
  
  return newCrush;
};

// const alterCrush = (infoCrush, id) => {
//   const { name, age, date } = infoCrush;
//   const file = fs.readFileSync(filePath, 'utf-8');
//   const crushes = JSON.parse(file);  

//   crushes.map((crush) => {
//     if (crush.id === id) {
//       return { ...infoCrush };
//     }
//     return true;
//   });

//   console.log(crushes);
// };

module.exports = {
  getAllCrushes,
  getCrush,
  createCrush,  
  // alterCrush,
};
