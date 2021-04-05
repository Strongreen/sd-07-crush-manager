const fs = require('fs').promises;
const path = require('path');

// Função para ler o arquivo JSON. Crie o endpoint GET /crush
async function readCrushFile() {
  return JSON.parse(await fs.readFile(path.resolve(__dirname, '..', 'crush.json')));
}

// Função para escrever no arquivo JSON.
async function writeCrushFile(content) {
  await fs.writeFile(path.join(__dirname, '..', 'crush.json'), JSON.stringify(content, null, 2));
}

// Fonte: https://stackoverflow.com/questions/58325771/how-to-generate-random-hex-string-in-javascript
function genRanHex(size) {
  return [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
}

// Fonte: https://www.codegrepper.com/code-examples/javascript/check+mail+with+regex
function validEmail(email) {
  const validate = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return validate.test(email);
}

module.exports = { readCrushFile, writeCrushFile, genRanHex, validEmail };
