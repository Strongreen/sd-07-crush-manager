const tokenCheckMiddleware = (req, res, next) => {
    const { authorization } = req.headers;
    console.log(authorization);
    if (authorization) {
        next();
    } else {
        res.status(401).send({
            message: 'Token não encontrado',
        });
    }
};

module.exports = tokenCheckMiddleware;
