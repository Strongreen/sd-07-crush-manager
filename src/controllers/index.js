const fs = require('fs');
const data = require('../../crush.json');

const SUCCESS = 200;
const FAIL = 500;

const getCrushes = async (req, res) => {
  try {
    const resulte = await fs.promises.readFile(data);
    return res.status(SUCCESS).send(resulte);
  } catch (error) {
    console.error(error);
    return res.status(FAIL).send({ menssage: error.menssage });
  }
};

module.exports = { getCrushes };
