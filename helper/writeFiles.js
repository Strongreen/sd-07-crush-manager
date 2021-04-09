const fs = require('fs');

function writeFiles(crush) {
    const path = `${__dirname}/../crush.json`;
    fs.writeFileSync(path, 'utf8', crush);
}
  
module.exports = { writeFiles };
