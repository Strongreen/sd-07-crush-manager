const { resolve } = require('path');
const { readFile } = require('fs').promises;

const crushFile = '../crush.json';

const readCrushes = async () => JSON.parse(await readFile(resolve(__dirname, crushFile), 'utf-8'));

module.exports = {
  readCrushes,
};
