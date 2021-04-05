const checkNameMidware = (req, res, next) => {
    const { body } = req;

    if (!body.age) {
        res.status(400).send(
            {
                message: 'O campo "age" é obrigatório',
            },
        );
    } else if (body.age < 18) {
        res.status(400).send(
            {
                message: 'O crush deve ser maior de idade',
            },
        );
    } else {
        next();
    }
};

module.exports = checkNameMidware;