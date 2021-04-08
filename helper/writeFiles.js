const fs = require('fs');

const BAD = 400;
const SUCCESS = 201;

function writeFiles(crush, res) {
    const path = `${__dirname}/../crush.json`;
    fs.writeFile(path, JSON.stringify(crush), (err) => {
        if (err) {
          return res.status(BAD).send(err);
           }
        if (crush) {
        return res.status(SUCCESS).send(crush);
        }
    });
}

module.exports = { writeFiles };
