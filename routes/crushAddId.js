const fs = require('fs').promises;
const file = require('./crushFile');

const crushData = 'crush.json';

async function crushAddIdFunction(request, response) {
  try {
    const { id } = request.params;
    const { name, age, date } = request.body;
    const showFile = await file.readPromise(crushData);
    const index = showFile.findIndex((result) => result.id.toString() === id);
    showFile[index].name = name;
    showFile[index].age = age;
    showFile[index].date = date;
    await fs.writeFile(crushData, JSON.stringify(showFile));
    return response.status(200).send(showFile[index]);
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = { crushAddIdFunction };

//  async function crushAddIdFunction(request, response) {
//    try {
//      const { id } = request.params;
//      const { name, age, date } = request.body;
//      const showFile = await file.readPromise(crushData);
//      showFile.map((result) => {
//          if (result.id.toString() === id) {
//           result.name = name;
//           result.age = age;
//           result.date = date;
//          }
//          return result;
//          //  response.status(200).send(result);
//      });
//    } catch (error) {
//      throw new Error(error);
//    }
//  }