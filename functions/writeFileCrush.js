const fs = require('fs').promises;

async function writeFileCrush(newFile) {
  try {
    await fs.writeFile('./crush.json', JSON.stringify(newFile));
    return true;
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = writeFileCrush;
