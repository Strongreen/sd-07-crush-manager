const emailMiddleware = (req, res, next) => {
    const { email } = req.body;

    if (email === undefined || email.length === 0) {
        return res.status(400).send({ message: 'O campo "email" é obrigatório' });
    }
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        return res.status(400).send({
            message: 'O "email" deve ter o formato "email@email.com"',
        });
    }

    next();
};

module.exports = emailMiddleware;
