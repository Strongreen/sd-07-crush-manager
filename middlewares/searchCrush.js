const fs = require('fs').promises;

const searchCrushMiddware = async (req, res, _next) => {
    const { q } = req.query;
    if (!q) {
        res.status(404).send({
            message: 'informe o termo da busca',
        });
    } else {
        const data = await fs.readFile(`${__dirname}/../crush.json`);
        const convert = JSON.parse(data);
        const dataCrushFilter = convert.filter(({ name }) =>
            name.toLowerCase().includes(q.toLowerCase()));
        try {
            res.send(dataCrushFilter);
        } catch (error) {
            console.log(error);
        }
    }
};

module.exports = searchCrushMiddware;