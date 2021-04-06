const ageMiddleware = (req, res, next) => {
    const { age } = req.body;

    if (age === undefined || age === 0) {
        return res.status(400).send({ message: 'O campo "age" é obrigatório' });
    }

    if (age < 18) {
        return res.status(400).send({
            message: 'O crush deve ser maior de idade' });
    }

    next();
};

module.exports = ageMiddleware;
