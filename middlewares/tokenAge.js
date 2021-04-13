const tokenAge = (req, res, next) => {
    const { age } = req.body;
    if (typeof age === 'undefined' || !age || !Number.isInteger(age)) {
        res.status(400).send({
            message: 'O campo "age" é obrigatório',
        });
    } else if (age < 18) {
        res.status(400).send({
            message: 'O crush deve ser maior de idade',
        });
    }
    next();
};

module.exports = tokenAge;