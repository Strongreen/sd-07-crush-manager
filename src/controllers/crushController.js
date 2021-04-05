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

async function idIndex(request, response) {
  const { id } = request.params;
  try {
    const arquivo = await file.readFilePromise(fileName);
    const findCrush = arquivo.filter((crush) => crush.id === Number(id));
    if (findCrush.length === 0) { 
      return response.status(404).json({ message: 'Crush não encontrado' }); 
    }
    return response.status(200).json(findCrush[0]);
  } catch (error) {
    throw new Error('Erro ao ler o arquivo', error);    
  }
}

module.exports = { index, idIndex };