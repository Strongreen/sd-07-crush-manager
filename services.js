const fs = require('fs').promises;

const SUCCESS = 200;
const NO_TOKEN = 'Token não encontrado';
const INVALID_TOKEN = 'Token inválido';

const readCrush = async () => {
  const file = await fs.readFile('./crush.json', 'utf-8');
  return JSON.parse(file);
};

const isDateValid = (datedAt) => {
  const verifyDate = /(((^0|^1|^2)[0-9])|(^3[0-1]))\/((0[0-9])|(1[0-2]))\/(((19|20)[0-9]{2}$))/mg;
  return verifyDate.test(datedAt);
};

const getCrushes = async (req, res) => {
  const file = await readCrush();
  if (!file) {
    res.status(SUCCESS).json([]);
  } else {
    res.status(SUCCESS).json(file);
  }
};

const getCrushById = async (req, res) => {
  const file = await readCrush();
  const { id } = req.params;
  const numberID = parseFloat(id);
  const searchCrush = file.find((crush) => crush.id === numberID);
  if (!searchCrush) {
    res.status(404).json({ message: 'Crush não encontrado' });
  } else {
    res.status(SUCCESS).json(searchCrush);
  }
};

const validateUser = (req, res, next) => {
  const authNumber = req.headers.authorization;
  if (!authNumber) {
    return res.status(401).json({ message: NO_TOKEN });
  }
  if (authNumber.length !== 16) {
    return res.status(401).json({ message: INVALID_TOKEN });
  }
  next();
};

const validateName = (req, res, next) => {
  const name = req.body;
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name && name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const validateAge = (req, res, next) => {
  const age = req.body;
  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age && age.length < 18) {
    return res.status(400).json({ message: 'O crush deve ser maior de idade' });
  }
  next();
};

const validateDate = (req, res, next) => {
  const date = req.body;
  if (!date || !date.datedAt || typeof date.rate !== 'number') {
    return res
    .status(400)
    .json({ message: 'O campo "date" é obrigatório e o "datedAt" e "rate" não podem ser vazios' });
  }
  if (!isDateValid(date.datedAt)) {
    return res
    .status(400).json({ message: 'O campo "datedAt" deve ter pelo o formato "dd/mm/aaaa"' });
  }
  next();
};

const validateRate = (req, res, next) => {
  const { date } = req.body;
  if (date.rate <= 0 || date.rate > 5) {
    return res
    .status(400)
    .json({ message: 'O campo "rate" deve ser um inteiro de 1 a 5' });
  }
  next();
};

const createCrush = async (req, res) => {
  const file = await readCrush();
  const { name, age, date } = req.body;
  const id = file.length + 1;
  const newCrush = ({ name, age, id, date });
  file.push(newCrush);
  fs.writeFile('./crush.json', JSON.stringify(file));
  return res.status(201).json(newCrush);
};

const updateCrush = async (req, res) => {
  const { id } = req.params;
  const file = await readCrush();
  const numberID = parseFloat(id);
  const { name, age, date } = req.body;
  const searchCrush = file.find((crush) => crush.id === numberID);
  searchCrush.name = name;
  searchCrush.age = age;
  searchCrush.date = date;
  return res.status(200).json(searchCrush);
};

const deleteCrush = async (req, res) => {
  const { id } = req.params;
  const file = await readCrush();
  const indexId = parseFloat(id);
  file.splice(indexId, 1);
  res.status(200).json({ message: 'Crush deletado com sucesso' });
};

const searchCrush = async (req, res) => {
  const { q } = req.query;
  const file = await readCrush();
  if (!q) {
    return res.status(200).json(file);
  }
  const results = file.filter((crush) => crush.name.includes(q));
  return res.status(200).json(results);
};

module.exports = {
  getCrushes,
  getCrushById,
  validateUser,
  validateName,
  validateAge,
  validateDate,
  validateRate,
  createCrush,
  updateCrush,
  deleteCrush,
  searchCrush,
};
