const TOKEN = 401;

function validToken(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
       return res.status(TOKEN).send({ message: 'Token não encontrado' });
    }
    if (authorization.length === 0) {
        return res.status(TOKEN).send({ message: 'Token inválido' });
    }
    if (authorization.length !== 16) {
       return res.status(TOKEN).send({ message: 'Token inválido' });
    }
    next();
}

module.exports = { validToken };
