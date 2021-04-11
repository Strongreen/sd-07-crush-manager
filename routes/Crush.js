const crushData = require('../crush.json');

const SUCCESS = 200;

const Crush = async (_req, res) => {
  res.send(crushData);
  res.status(SUCCESS).send();
};

module.exports = Crush;
