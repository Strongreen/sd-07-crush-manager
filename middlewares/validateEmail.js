const validateEmailMiddleware = (req, res, next) => {
    const { email } = req.body;
    const regularExpression = /\S+@\S+\.\S+/;
    if (email === '' || email === undefined) {
        return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    }
    if (!regularExpression.test(email)) {
        return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    next();    
};

module.exports = validateEmailMiddleware;