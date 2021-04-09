const TOKEN = 401;

function validToken(token, res) {
    if (!token) {
       res.status(TOKEN).send({ message: 'Token não encontrado' });
    }
    if (token.length === 0) {
        res.status(TOKEN).send({ message: 'Token inválido' });
    }
    if (token.length !== 16) {
        res.status(TOKEN).send({ message: 'Token inválido' });
    }
}

module.exports = { validToken };
