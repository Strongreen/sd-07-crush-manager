const tokenDateObr = (req, res, next) => {
    const { datedAt, rate } = req.body.date;
    const dataRegex = (/([0-2][0-9]|3[0-1])\/(0[0-9]|1[0-2])\/[0-9]{4}/).test(datedAt);
    if (!dataRegex) {
        res.status(400).send({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    
    if (Number.isInteger(rate) && rate > 0 && rate <= 5) {
        next();
    } else {
        res.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    };
    
    module.exports = tokenDateObr;