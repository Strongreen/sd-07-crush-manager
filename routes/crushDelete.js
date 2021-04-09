const fs = require('fs').promises;
const file = require('./crushFile');

const crushData = 'crush.json';

async function crushDeleteFunction(request, response) {
  const { id } = request.params;
  const showFile = await file.readPromise(crushData);
  const index = showFile.findIndex((result) => result.id === Number(id));
  console.log(index);
  if (index === -1) {
    console.log('entro');
    return response.status(404).send({ message: 'Crush não encontrado' });
  } 
  const newFile = showFile.slice(index);
  await fs.writeFile(crushData, JSON.stringify(newFile));
  return response.status(200).send({
    message: 'Crush deletado com sucesso',
  });
}

module.exports = { crushDeleteFunction };