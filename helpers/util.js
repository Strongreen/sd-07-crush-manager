const fs = require('fs');
const crypto = require('crypto');

const readFile = async (fileName) => {
  try {
    const data = await fs.promises.readFile(`${__dirname}/../${fileName}.json`, 'utf8');
    const content = await JSON.parse(data);
    return content;
  } catch (error) {
    throw new Error(error);
  }
};

const whriteFile = async (fileName, data) => {
  try {
    await fs.promises.writeFile(`${__dirname}/../${fileName}.json`, JSON.stringify(data));
  } catch (error) {
    throw new Error(error);
  }
};

const generateToken = (length) => crypto.randomBytes(length).toString('hex');

module.exports = {
  readFile,
  whriteFile,
  generateToken,
};
