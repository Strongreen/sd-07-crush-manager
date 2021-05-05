const fs = require('fs').promises;

const writeCrush = async (content) => {
  fs.writeFile(
    `${__dirname}/../crush.json`, JSON.stringify(content), 'utf8',
    (err) => {
      if (err) console.log(err.message);
    },
  );
};

module.exports = writeCrush;
