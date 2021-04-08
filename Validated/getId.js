const fs = require('fs');

async function getId() {
  const path = `${__dirname}/../crush.json`;
  const crushes = JSON.parse(await fs.readFileSync(path, 'utf8'));
  return { crushes, id: Number(crushes.length) };
}

module.exports = { getId };
