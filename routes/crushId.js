const file = require('./crushFile');

const crushData = 'crush.json';

async function crushIdFunction(request, response) {
  try {
    const { id } = request.params;
    const showFile = await file.readPromise(crushData);
    const results = showFile
      .find((result) => 
        result.id.toString() === id);
    if (!results) {
      response.status(404).send({ message: 'Crush não encontrado' });
    }
    response.status(200).send(results);
  } catch (e) {
    throw new Error(e);
  } 
} 

module.exports = { crushIdFunction };
