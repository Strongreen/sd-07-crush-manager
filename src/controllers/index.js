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

const getCrushById = async (req, res) => {
  try {
    const { id } = req.params;
    const crushes = await fs.promises.readFile(`${__dirname}/../../crush.json`, 'utf-8');
    const arrayOfCrushes = JSON.parse(crushes);
    const currCrush = arrayOfCrushes.find((index) => index.id === id);
    currCrush ? res.status(SUCCESS).send(JSON.parse(currCrush)) : res.status(FAIL).send({ "message": 'Crush não encontrado' });

  } catch (error) {
    return res.status(FAIL).send({ menssage: error.menssage });
  }
};

module.exports = { getCrushes, getCrushById };
