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

module.exports = { index, store };
