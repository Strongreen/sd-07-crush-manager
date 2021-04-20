const fs = require('fs');
const crypto = require('crypto');

const SUCCESS = 200;
const CREATED = 201;
const FAIL = 500;
const NOTFOUND = 404;
const crushFile = `${__dirname}/../../crush.json`;

const getCrushes = async (req, res) => {
  try {
    const result = await fs.promises.readFile(crushFile, 'utf-8');
    return res.status(SUCCESS).send(JSON.parse(result));
  } catch (error) {
    console.error(error);
    return res.status(FAIL).send({ menssage: error.menssage });
  }
};

const getCrushById = async (req, res) => {
  try {
    const { id } = req.params;
    const crushes = await fs.promises.readFile(crushFile, 'utf-8');
    const arrayOfCrushes = JSON.parse(crushes);
    const currCrush = arrayOfCrushes.find((index) => index.id === parseInt(id, 10));
    if (!currCrush) return res.status(NOTFOUND).send({ message: 'Crush não encontrado' });
    return res.status(SUCCESS).send(currCrush);
  } catch (error) {
    return res.status(FAIL).send({ menssage: error.menssage });
  }
};

const geradorDeToken = () => {
  const token = crypto.randomBytes(8).toString('hex');
  return token;
};

const login = async (req, res) => {
  try {
    const token = geradorDeToken();
    return res.status(SUCCESS).send({ token });
  } catch (error) {
    return res.status(FAIL).send({ menssage: error.menssage });
  }
};

const createCrush = async (req, res) => {
  const { name, age, date } = req.body;
  const result = await fs.promises.readFile(crushFile, 'utf-8');
  const resultArray = JSON.parse(result);
  const newId = result.length + 1;

  const newCrush = ({ name, age, newId, date });
  resultArray.push(newCrush);

  await fs.promises.writeFile('../../crush.json', JSON.stringify(resultArray));
  return res.status(CREATED).json(newCrush);
};

module.exports = { getCrushes, getCrushById, login, createCrush };
