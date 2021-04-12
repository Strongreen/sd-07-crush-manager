const fs = require('fs');

const SUCCESS = 200;
const FAIL = 500;

const getCrushes = async (req, res) => {
  try {
    const result = await fs.promises.readFile(`${__dirname}/../../crush.json`, 'utf-8');
    return res.status(SUCCESS).send(JSON.parse(result));
  } catch (error) {
    console.error(error);
    return res.status(FAIL).send({ menssage: error.menssage });
  }
};

module.exports = { getCrushes };
