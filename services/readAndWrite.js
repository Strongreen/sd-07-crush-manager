const fs = require('fs').promises;

async function readFile() {
  return fs.readFile(`${__dirname}/../crush.json`, 'utf-8')
  .then((content) => JSON.parse(content))
  .catch((err) => console.log(err.message));
}

const writeFile = async (file) => (
  fs.writeFile(
    `${__dirname}/../crush.json`,
    JSON.stringify(file),
    'utf8',
    (err) => {
      if (err) throw err;
    },
  )
);

module.exports = {
  readFile,
  writeFile,
};