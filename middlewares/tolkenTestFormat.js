const tolkenTestFormat = (req, res, next) => {
    const { authorization } = req.headers;
    const tokenvalidation = (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).test(authorization);
    if (!tokenvalidation) {
        res.status(400).send({
            message: 'Token inválido',
        });
    }
    next();
};

module.exports = tolkenTestFormat;