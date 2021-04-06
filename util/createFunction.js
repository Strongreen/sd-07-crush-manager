const fs = require('fs');

const createFunction = async (body) => {
    const { name, age, date } = body;
    const file = JSON.parse(await fs.promises.readFile('./crush.json', 'utf8'));
    const id = file.length === 0 ? 1 : file[file.length - 1].id + 1;

    const newCrush = [...file, { id, name, age, date }];

    await fs.promises.writeFile('./crush.json', JSON.stringify(newCrush));

    return { id, name, age, date };
};

module.exports = createFunction;
