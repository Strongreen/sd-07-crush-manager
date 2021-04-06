const fs = require('fs').promises;

const readFile = async () => {
  try {
    const content = await fs.readFile('./crush.json');
    return JSON.parse(content.toString('utf-8'));
  } catch (error) {
    throw new Error('Não foi possível ler o arquivo de dados');
  }
};

const readFile1 = async () => {
  console.log('teste');
};

// export default readFile;
module.exports = { readFile, readFile1 };
