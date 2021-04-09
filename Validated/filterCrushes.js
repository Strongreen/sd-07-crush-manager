const { validFoundCrush } = require('./validFoundCrush');
const { getId } = require('./getId');

const NOTFOUND = 404;

async function filterCrushes(id, res) {
  const { crushes } = await getId();
    try {
      const filterCrush = crushes.find((crush) => crush.id === Number(id));
      validFoundCrush(filterCrush);
      return filterCrush;
    } catch (error) {
      res.status(NOTFOUND).send({ message: error.message });
  }
}

module.exports = { filterCrushes };
