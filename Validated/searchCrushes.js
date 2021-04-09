const { getId } = require('./getId');

async function searchCrushes(search) {
  const { crushes } = await getId();
  crushes.filter((crush) => crush.name.includes(search));
  return { crushes }; 
}

module.exports = { searchCrushes };
