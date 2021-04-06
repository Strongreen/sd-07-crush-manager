const passwordMiddleware = (req, res, next) => {
    const { password } = req.body;

    if (password === undefined || password.length === 0) {
        return res.status(400).send({ message: 'O campo "password" é obrigatório' });
    }
    if (password.length < 6) {
        return res.status(400).send({
            message: 'A "senha" deve ter pelo menos 6 caracteres',
        });
    }

    next();
};

module.exports = passwordMiddleware;
