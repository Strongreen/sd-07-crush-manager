const fs = require('fs');

function writeFiles(crush) {
    const path = `${__dirname}/../crush.json`;
    fs.writeFileSync(path, JSON.stringify(crush), 'utf8');
}
  
module.exports = { writeFiles };
