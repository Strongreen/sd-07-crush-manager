const validateRegexDateMiddleware = (req, res, next) => {
    const { date } = req.body;
    const regexDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
    if (!regexDate.test(date.datedAt)) {
        return res.status(400).json({ 
            message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"', 
        });
    }
    if (!(parseInt(date.rate, 10) >= 1 && parseInt(date.rate, 10) <= 5)) {
        return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }

    next();    
};

module.exports = validateRegexDateMiddleware;
