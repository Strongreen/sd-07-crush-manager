const fs = require('fs').promises;
const file = require('./crushFile');

const crushData = 'crush.json';

async function crushAddFunction(request, response) {
  const { body } = request;
  try {
    const { name, age, date } = body;
    const showFile = await file.readPromise(crushData);
    const newCrush = { name, age, id: showFile.length + 1, date };
    showFile.push(newCrush);
    await fs.writeFile(crushData, JSON.stringify(showFile));
    return response.status(201).send({
      id: showFile.length,
      name: newCrush.name,
      age: newCrush.age,
      date: newCrush.date,
    });
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = { crushAddFunction };