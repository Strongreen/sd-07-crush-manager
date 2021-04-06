const fs = require('fs');

const getCrushMiddleware = async (req, res, next) => {
    const { id } = req.params;
    const file = JSON.parse(await fs.promises.readFile('./crush.json', 'utf8'));
    const crushExists = file.some((crush) => crush.id === Number(id));

    if (!crushExists) return res.status(404).send({ message: 'Crush não encontrado' });

    next();
};

module.exports = getCrushMiddleware;
