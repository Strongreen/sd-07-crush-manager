const checkNameMidware = (req, res, next) => {
    const { body } = req;
    if (!body.date || !body.date.datedAt || (!body.date.rate && body.date.rate !== 0)) {
        res.status(400).send(
            {
                message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
            },
        );
    } else {
        next();
    }
};

module.exports = checkNameMidware;