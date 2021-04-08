const file = require('./crushFile');

const crushData = 'crush.json';

async function crushAddFunction(request, response) {
  const { body } = request;
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

module.exports = { crushAddFunction };