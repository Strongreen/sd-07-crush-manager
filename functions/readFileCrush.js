const fs = require('fs').promises;

async function readFileCrush() {
  try {
    const content = await fs.readFile('./crush.json');
    return JSON.parse(content.toString('utf-8'));
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = readFileCrush;
