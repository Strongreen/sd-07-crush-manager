const { getCrushs } = require('../functions');
const { SUCCESS, NOT_FOUND } = require('../consts');

module.exports = (req, res) => {
  const { id } = req.params;
  const filteredCrush = getCrushs().find((crush) => crush.id === Number(id));
  if (filteredCrush) {
    res.status(SUCCESS).json(filteredCrush);
  } else {
    res.status(NOT_FOUND).json({ message: 'Crush não encontrado' });
  }
};
