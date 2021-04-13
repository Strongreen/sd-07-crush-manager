// referencia Marcos 
const tokenInvalido = (req, res, next) => {
    const { authorization } = req.headers;
    const tokenRegex = (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).test(authorization);
    if (!tokenRegex) {
        res.status(401).json({
            message: 'Token inválido',
        });
    }
    next();
};

module.exports = tokenInvalido;