const fs = require('fs');

function getId() {
  const path = `${__dirname}/../crush.json`;
  const crushes = JSON.parse(fs.readFileSync(path, 'utf8'));
  return { crushes, id: Number(crushes.length) };
}

module.exports = { getId };
