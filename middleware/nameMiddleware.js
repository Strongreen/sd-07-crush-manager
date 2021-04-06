const nameMiddleware = (req, res, next) => {
    const { name } = req.body;

    if (name === undefined || name.length === 0) {
        return res.status(400).send({ message: 'O campo \"name\" é obrigatório' });
    }

    if (name.length <= 3) {
        return res.status(400).send({
            message: 'O \"name\" deve ter pelo menos 3 caracteres' });
    }

   return next();
};

module.exports = nameMiddleware;
