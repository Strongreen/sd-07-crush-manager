const NOTFOUND = 401;

function validToken(token, res) {
    if (!token) {
        return res.status(NOTFOUND)
                  .send({ message: 'Token não encontrado' });
    }
    if (token.length === 0 || token.length !== 16) {
        return res.status(NOTFOUND)
                  .send({ message: 'Token inválido' });
    }
    
}

module.exports = { validToken };
