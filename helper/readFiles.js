const { getId } = require('../Validated');

const SUCCESS = 200;

async function readFiles(_req, res) {
  const crush = await getId();
  return res.status(SUCCESS).send(crush.crushes);
}

module.exports = { readFiles };
