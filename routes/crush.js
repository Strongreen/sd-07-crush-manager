const file = require('./crushFile');

const crushData = 'crush.json';

async function crushFunction(request, response) {
  const showFile = await file.readPromise(crushData);
  return response.status(200).json(showFile);
}

module.exports = { crushFunction };
