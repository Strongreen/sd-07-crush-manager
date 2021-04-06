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

const alterCrush = (infoCrush, id) => {
  const { name, age, date } = infoCrush;
  const file = fs.readFileSync(filePath, 'utf-8');
  const crushes = JSON.parse(file);  

  for (let i = 0; i <= crushes.length; i += 1) {
    if (crushes[i].id === Number(id)) {
      crushes[i].name = name;
      crushes[i].age = age;
      crushes[i].date = date;
      break;
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(crushes));

  return {
    id: Number(id), name, age, date,
  };
};

const deleteCrush = (id) => {
  const file = fs.readFileSync(filePath, 'utf-8');
  const crushes = JSON.parse(file);
  
  const refreshedCrushes = crushes.filter((crush) => crush.id !== Number(id));
  
  fs.writeFileSync(filePath, JSON.stringify(refreshedCrushes));

  return {
    message: 'Crush deletado com sucesso',
  };
};

const searchCrush = (searchTerm) => {
  const file = fs.readFileSync(filePath, 'utf-8');
  const crushes = JSON.parse(file);

  const crushFound = crushes.filter((crush) => crush.name.includes(searchTerm) === true);

  if (crushFound.length === 0) {
    const allCrushes = getAllCrushes();

    return allCrushes;
  }
  
  return crushFound;
};

module.exports = {
  getAllCrushes,
  getCrush,
  createCrush,  
  alterCrush,
  deleteCrush,
  searchCrush,
};
