const { getIdMiddleware } = require('./getIdMid');

async function searchCrushes(search) {
  const { crushes } = await getIdMiddleware();
  crushes.filter((crush) => crush.name.includes(search));
  return { crushes }; 
}

module.exports = { searchCrushes };
