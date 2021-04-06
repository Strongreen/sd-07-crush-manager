const fs = require('fs');

const searchFunction = async (query) => {
    const { q } = query;
    const file = JSON.parse(await fs.promises.readFile('./crush.json', 'utf8'));

    if (q === undefined || q.length === 0) {
        return file;
    }

    return file.filter((f) => f.name.includes(q));
};

module.exports = searchFunction;
