const tokenMiddleware = (req, res, next) => {
    const { authorization } = req.headers;
    if (authorization === undefined || authorization.length === 0) {
        return res.status(401).send({ message: 'Token não encontrado' });
    }
    if (authorization.length !== 16) {
        return res.status(401).send({ message: 'Token inválido' });
    }    

    next();
};

module.exports = tokenMiddleware;
