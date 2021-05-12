const fs = require('fs');
const file = require('../helpers/files');
const {
  nameValidation,
  ageValidation,
  dateValidation,
  rateValidation } = require('../helpers/validations');

const fileName = 'crush.json';

async function index(request, response) {
  try {
    const arquivo = await file.readFilePromise(fileName);
    return response.status(200).json(arquivo);
  } catch (error) {
    throw new Error('Erro ao ler o arquivo', error);
  }
}

async function store(request, response) {
  const { name, age, date } = request.body;
  let id = 1;
  try {
    if (!date) {
      throw new Error('O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios');
    }
    nameValidation(name);
    ageValidation(age);
    dateValidation(date.datedAt);
    rateValidation(date.rate);
    const crushList = await file.readFilePromise(fileName);
    if (crushList.length !== 0) id = crushList.length + 1;
    crushList.push({ id, name, age, date });
    await fs.promises.writeFile(fileName, JSON.stringify(crushList));
    return response.status(201).send({ id, name, age, date });
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
}

async function update(request, response) {
  const { name, age, date } = request.body;
  let { id } = request.params;
  try {
    nameValidation(name);
    ageValidation(age);
    dateValidation(date ? date.datedAt : undefined);
    rateValidation(date.rate);
    const crushList = await file.readFilePromise(fileName);
    const filteredCrushList = crushList.filter((crush) => crush.id !== id);
    id = parseInt(id, 10);
    await fs.promises.writeFile(fileName,
      JSON.stringify([filteredCrushList, { id, name, age, date }]));
    return response.status(200).json({ id, name, age, date });
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
}

async function deleteCrush(request, response) {
  const { id } = request.params;
  try {
    const crushList = await file.readFilePromise(fileName);
    const filteredCrushList = crushList.filter((next) => next.id !== id);
    await fs.promises.writeFile(fileName, JSON.stringify(filteredCrushList));
    return response.status(200).send({ message: 'Crush deletado com sucesso' });
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
}

async function search(request, response) {
  const { q } = request.query;
  try {
    const crushList = await file.readFilePromise(fileName);
    if (q === undefined || q === '') {
      return response.status(200).json(crushList);
    }
    const findedCrush = crushList.filter((crush) => (crush.name).includes(q));
    return response.status(200).json(findedCrush);
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
}

module.exports = { index, store, update, deleteCrush, search };
