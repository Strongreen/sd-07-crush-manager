const tokenInvalido = (req, res, next) => {
    const { authorization } = req.headers;
    const tokenRegex = (/.{16,}/).test(authorization);
    if (!tokenRegex) {
      return res.status(401).send({
            message: 'Token inválido',
        });
    }
    next();
};

module.exports = tokenInvalido;