const fs = require('fs');

function getAllCrushs() {
  return fs.promises
    .readFile(`${__dirname}/../crush.json`, 'utf8')
    .then((content) => content)
    .then((stringified) => JSON.parse(stringified))
    .catch((error) => error.message);
}

async function getCrushById(id) {
    const crushs = await getAllCrushs();
    const crush = crushs[id - 1];
    return crush;
}

/* 
  function setCrushs(index, newCrush) {
    data[index] = newCrush;
    fs.promises
      .writeFile(data, JSON.stringify(data), 'utf8')
      .then(() => {
        console.log('Crush adicionado com sucesso!');
      })
      .catch((error) => {
        console.error(error.message);
      });
  } */

module.exports = {
  getAllCrushs,
  getCrushById,
};
