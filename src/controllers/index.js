const fs = require('fs');
const crypto = require('crypto');

const SUCCESS = 200;
const CREATED = 201;
const NOTFOUND = 404;
const FAIL = 500;
const crushFile = `${__dirname}/../../crush.json`;

const getCrushes = async (req, res) => {
  try {
    const result = await fs.promises.readFile(crushFile, 'utf-8');
    return res.status(SUCCESS).json(JSON.parse(result));
  } catch (error) {
    console.error(error);
    return res.status(FAIL).json({ menssage: error.menssage });
  }
};

const getCrushById = async (req, res) => {
  try {
    const { id } = req.params;
    const crushes = await fs.promises.readFile(crushFile, 'utf-8');
    const arrayOfCrushes = JSON.parse(crushes);
    const currCrush = arrayOfCrushes.find((index) => index.id === parseInt(id, 10));
    if (!currCrush) return res.status(NOTFOUND).json({ message: 'Crush não encontrado' });
    return res.status(SUCCESS).json(currCrush);
  } catch (error) {
    return res.status(FAIL).json({ menssage: error.menssage });
  }
};

const geradorDeToken = () => {
  const token = crypto.randomBytes(8).toString('hex');
  return token;
};

const login = (req, res) => {
  try {
    const token = geradorDeToken();
    return res.status(SUCCESS).json({ token });
  } catch (error) {
    return res.status(FAIL).json({ menssage: error.menssage });
  }
};

const createCrush = async (req, res) => {
  try {
    const { name, age, date } = req.body;
    const result = await fs.promises.readFile(crushFile, 'utf-8');
    const resultArray = JSON.parse(result);
    const id = 5;

    const newCrush = ({ name, age, id, date });
    resultArray.push(newCrush);

    await fs.promises.writeFile(crushFile, JSON.stringify(resultArray));
    return res.status(CREATED).json(newCrush);
  } catch (error) {
    return res.status(FAIL).json({ menssage: error.menssage });
  }
};

const updateCrush = async (req, res) => {
  const { id } = req.params;
  const { name, age, date: { datedAt, rate } } = req.body;
  const resultArray = await fs.promises.readFile(crushFile, 'utf-8');
  const crushIndex = resultArray.find((index) => index.id === parseInt(id, 10));
  const updatedCrush = { id: crushIndex + 1, name, age, date: { datedAt, rate } };

  try {
    resultArray.splice(crushIndex, 1, updatedCrush);
    await fs.promises.writeFile(crushFile, JSON.stringify(resultArray));

    return res.status(SUCCESS).json(updatedCrush);
  } catch (error) {
    return res.status(FAIL).json({ menssage: error.menssage });
  }
};

module.exports = {
  getCrushes,
  getCrushById,
  login,
  createCrush,
  updateCrush,
};
