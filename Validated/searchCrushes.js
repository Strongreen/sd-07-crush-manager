const { getId } = require('./getId');

async function searchCrushes(search) {
  if (!search) return [];
  const { crushes } = await getId();
  const filterCrush = crushes.filter((crush) => crush.nome.includes(search));
  return { crushes, filterCrush }; 
}

module.exports = { searchCrushes };
