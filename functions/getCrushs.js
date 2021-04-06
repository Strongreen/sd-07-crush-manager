const fs = require('fs');

module.exports = () => JSON.parse(fs.readFileSync(`${__dirname}/../crush.json`, 'utf-8'));