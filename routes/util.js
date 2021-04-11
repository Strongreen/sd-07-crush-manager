const fs = require('fs').promises;

const readCrushJson = async () => {
  const file = await fs.readFile(`${__dirname}/../crush.json`);
  return JSON.parse(file.toString('utf-8'));
};

module.exports = {
  readCrushJson,
};