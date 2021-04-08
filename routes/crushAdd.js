const validToken = require('../valid/validToken');
const file = require('./crushFile');

const crushData = 'crush.json';
const { validTokenFunction } = validToken;

async function crushAdd(body, response) {
  try {
    const { name, age, date } = body;
    const showFile = await file.readPromise(crushData);
    const newCrush = { id: 1, name, age, date };
    showFile.push(newCrush);
    console.log(showFile);
    return response.status(201).send({
      id: newCrush.id,
      name: newCrush.name,
      age: newCrush.age,
      date: newCrush.date,
    });
  } catch (error) {
    throw new Error(error);
  }
}

function crushAddFunction(request, response) {
  const { authorization } = request.headers;
  const { body } = request;
  validTokenFunction(authorization, response);
  crushAdd(body, response);
}

module.exports = { crushAddFunction };