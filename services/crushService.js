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

async function setCrushs(newCrush) {
  const crushs = await getAllCrushs();
  const crush = newCrush;
  crush.id = crushs.length + 1;
  crushs.push(crush);
  try {
    fs.promises.writeFile(
      `${__dirname}/../crush.json`,
      JSON.stringify(crushs),
      'utf8',
    );
  } catch (error) {
    console.error(error.message);
  }
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

function isValidName(name) {
  if (name.length <= 3) return false;
  return true;
}

function isOverEighteen(age) {
  if (age < 18) return false;
  return true;
}

function isValidDate(date) {
  const regex = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
  if (!date.match(regex)) return false;
  return true;
}

function isRateInRange(rate) {
  if (rate >= 1 && rate <= 5) return true;
  return false;
}

module.exports = {
  getAllCrushs,
  getCrushById,
  setCrushs,
  deleteCrushById,
  isValidName,
  isOverEighteen,
  isValidDate,
  isRateInRange,
};
