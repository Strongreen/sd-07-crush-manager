const fs = require('fs');

function read(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return data;
  } catch (err) {
    console.error(`Erro ao ler o arquivo: ${filePath}`);
  }
}

module.exports = read;
