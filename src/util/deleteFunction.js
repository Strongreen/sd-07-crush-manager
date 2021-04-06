const fs = require('fs');

const deleteFunction = async (params) => {
    const { ids } = params;
    const file = JSON.parse(await fs.promises.readFile('./crush.json', 'utf8'));
    const idExists = file.some((f) => f.id === Number(ids));

    if (idExists) {
        const filterCrush = file.filter((f) => f.id !== Number(ids));

        fs.promises.writeFile('./crush.json', JSON.stringify(filterCrush));

        return { message: 'Crush deletado com sucesso' };
    }
    return { message: 'Crush is not exists' };
};

module.exports = deleteFunction;
