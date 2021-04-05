const validateDate = (date) => {
    const dataRegex = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
    return dataRegex.test(date);
};

const checkNameMidware = (req, res, next) => {
    const { body } = req;
    
        if (!validateDate(body.date.datedAt)) {
            res.status(400).send(
                {
                    message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"',
                },
            );
        } else if (!Number.isInteger(body.date.rate) || body.date.rate < 1 || body.date.rate > 5) {
            res.status(400).send(
                {
                    message: 'O campo "rate" deve ser um inteiro de 1 à 5',
                },
            );
        } else {
            next();
        }
};

module.exports = checkNameMidware;
