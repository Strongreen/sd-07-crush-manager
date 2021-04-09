function validTokenSearch(token) {
    if (!token) {
        throw new Error('Token não encontrado');
    }
    if (token.length === 0 || token.length !== 16) {
        throw new Error('Token inválido');
    }
}

module.exports = { validTokenSearch };
