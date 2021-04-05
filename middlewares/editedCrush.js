const fs = require('fs');

const whriteFileSave = (convert) => {
    fs.writeFile(`${__dirname}/../crush.json`, JSON.stringify(convert, null, ' '), (err) => {
        if (err) {
            throw err;
        }
    });
};

const editedCrushMiddware = async (req, res, _next) => {
    const { body } = req;
    const { id } = req.params;

        const data = await fs.promises.readFile(`${__dirname}/../crush.json`);
        const convert = JSON.parse(data);
        const dataFind = convert.find((crush) => crush.id === Number(id));
        if (dataFind) {
            convert[convert.indexOf(dataFind)].name = body.name;
            convert[convert.indexOf(dataFind)].age = body.age;
            convert[convert.indexOf(dataFind)].date.datedAt = body.date.datedAt;
            convert[convert.indexOf(dataFind)].date.rate = body.date.rate;
            res.send(dataFind);
           whriteFileSave(convert);
        } else {
            res.status(404).send({ message: 'Crush não encontrado' });
        }
};

module.exports = editedCrushMiddware;