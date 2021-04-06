const fs = require('fs').promises;

const readFile = async () => {
  try {
    const content = await fs.readFile('./crush.json');
    return JSON.parse(content.toString('utf-8'));
  } catch (error) {
    throw new Error('Não foi possível ler o arquivo de dados');
  }
};

const writeFile = async (data) => {
  try {
    return await fs.writeFile('./crush.json', JSON.stringify(data));
  } catch (error) {
    throw new Error('Não foi possível escrever no arquivo de dados');
  }
};

module.exports = { readFile, writeFile };
