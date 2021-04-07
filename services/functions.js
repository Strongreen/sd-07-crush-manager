const { resolve, join } = require('path');
const { readFile, writeFile } = require('fs').promises;

const crushFile = join(__dirname, '../crush.json');

const readCrushes = async () => JSON.parse(await readFile(resolve(crushFile), 'utf-8'));
const writeCrushes = (crushes) => writeFile(resolve(crushFile), JSON.stringify(crushes, null, 2));

module.exports = {
  readCrushes,
  writeCrushes,
};
