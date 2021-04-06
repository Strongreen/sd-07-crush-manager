const fs = require('fs');
const sortFunction = require('./sortFunction');

const updateFunction = async (params, body) => {
    const { id } = params;
    const { name, age, date } = body;
    const file = JSON.parse(await fs.promises.readFile('./crush.json', 'utf8'));
    const idExists = file.some((f) => f.id === Number(id));

    if (idExists) {
        const filterCrush = file.filter((f) => f.id !== Number(id));
        const newCrush = [...filterCrush, { id: Number(id), name, age, date }];

        await fs.promises.writeFile(
            './crush.json', JSON.stringify(sortFunction(newCrush)),
        );

        return { id: Number(id), name, age, date };
    }
    return { message: 'Crush is not exists' };
};

module.exports = updateFunction;
