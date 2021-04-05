const checkToken = (token) => /^(\d|\w){16}$/gm.test(token);

const checkTokenMidware = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        res.status(401).send(
            {
                message: 'Token não encontrado',
            },
        );
    } else if (!checkToken(authorization)) {
        res.status(401).send(
            {
                message: 'Token inválido',
            },
        );
    } else {
        next();
    }
};

module.exports = checkTokenMidware;