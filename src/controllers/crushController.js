const file = require('../utils/files');

const fileName = 'crush.json'; 

async function index(request, response) {
  try {
    const arquivo = await file.readFilePromise(fileName);
    return response.status(200).json(arquivo);
  } catch (error) {
    throw new Error('Erro ao ler o arquivo', error);    
  }
}

module.exports = { index };