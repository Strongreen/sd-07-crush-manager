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
  try {
    if (!date) {
      throw new Error('O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios');
    }
    nameValidation(name);
    ageValidation(age);
    dateValidation(date.datedAt);
    rateValidation(date.rate);
    return response.send('dados validados');
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
}

module.exports = { index, store };
