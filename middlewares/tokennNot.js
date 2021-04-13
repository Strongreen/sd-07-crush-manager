const tokennNot = (req, res, next) => {
    const { authorization } = req.headers;
    if (authorization) {
        next();
    } else {
        res.status(401).send({
            message: 'Token não encontrado',
        });
    }
};

module.exports = tokennNot;