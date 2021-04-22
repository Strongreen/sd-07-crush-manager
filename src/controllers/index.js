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
  const idToUse = Number(id);
  const { name, age, date: { datedAt, rate } } = req.body;
  const result = await fs.promises.readFile(crushFile, 'utf-8');
  const resultArray = JSON.parse(result);
  const crushIndex = resultArray.find((index) => index.id === idToUse);
  const updatedCrush = { id: idToUse, name, age, date: { datedAt, rate } };

  try {
    resultArray.splice(crushIndex, 1, updatedCrush);
    await fs.promises.writeFile(crushFile, JSON.stringify(resultArray));

    return res.status(SUCCESS).json(updatedCrush);
  } catch (error) {
    return res.status(FAIL).json({ menssage: error.menssage });
  }
};

const deleteCrush = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await fs.promises.readFile(crushFile, 'utf-8');
    const resultArray = JSON.parse(result);

    const crushIndex = resultArray.findIndex((crush) => crush.id === Number(id));

    resultArray.splice(crushIndex, 1);
    await fs.promises.writeFile(resultArray, JSON.stringify(resultArray));
    return res.status(SUCCESS).json({ message: 'Crush deletado com sucesso' });
  } catch (error) {
    return res.status(SUCCESS).json({ message: 'Crush deletado com sucesso' });
  }
};

const searchCrush = async (req, res) => {
  const { q } = req.query;
  const result = await fs.promises.readFile(crushFile, 'utf-8');
  const resultArray = JSON.parse(result);
  if (!q) {
    return res.status(200).json(resultArray);
  }
  const response = resultArray.filter((crush) => crush.name.includes(q));
  if (!response) return res.status(NOTFOUND).json({ message: 'Crush não encontrado' });

  return res.status(200).json(response);
};

module.exports = {
  getCrushes,
  getCrushById,
  login,
  createCrush,
  updateCrush,
  deleteCrush,
  searchCrush,
};
