const { validFoundCrush } = require('./validFoundCrush');
const { getId } = require('./getId');

async function filterCrushes(id, res) {
  const { crushes } = await getId();
  if (crushes) {
    const filterCrush = crushes.find((crush) => crush.id === Number(id));
    validFoundCrush(filterCrush, res);
    return filterCrush;
  }
}

module.exports = { filterCrushes };
