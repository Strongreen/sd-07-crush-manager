const path = require('path');
const fs = require('fs').promises;
const crypto = require('crypto');

const generateToken = () => crypto.randomBytes(8).toString('hex');

const writeCrushFile = async (content) => (
  fs.writeFile(
    path.resolve(__dirname, '..', 'crush.json'),
    JSON.stringify(content),
    (err) => {
      if (err) throw err;
    },
  ));

module.exports = { generateToken, writeCrushFile };
