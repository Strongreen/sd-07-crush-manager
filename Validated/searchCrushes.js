const { validFoundCrush } = require('./validFoundCrush');
const { getId } = require('./getId');

async function searchCrushes(search, res) {
  if (!search) return [];
  const { crushes } = await getId();
  const regexSeach = /[a-zA-Z]+/;
  if (crushes) {
    const filterCrush = crushes.find((crush) => crush.nome === regexSeach);
    validFoundCrush(filterCrush, res);
    return filterCrush;
  }
}

module.exports = { searchCrushes };
