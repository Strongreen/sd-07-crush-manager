const { getCrushs } = require('../functions');
const { SUCCESS } = require('../consts');

module.exports = (_req, res) => {
  const crushs = getCrushs();
  res.status(SUCCESS).json(crushs);
};
