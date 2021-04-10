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

async function deleteCrushById(id) {
  const crushs = await getAllCrushs();
  const newCrushList = crushs.filter((crush) => crush.id !== Number(id));
  try {
    fs.promises.writeFile(
      `${__dirname}/../crush.json`,
      JSON.stringify(newCrushList),
      'utf8',
    );
  } catch (error) {
    console.error(error.message);
  }
}

/* 
function setCrushs(newCrush) {
    const crushs = await getAllCrushs();
    crush = newCrush;
    crush[id] = crushs.length + 1;
    crushs.push(crush);
    return fs.promises
      .writeFile(`${__dirname}/../crush.json`, JSON.stringify(data), 'utf8')
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
  deleteCrushById,
};
