function validName(name) {
    if (!name) {
        throw new Error('O campo "name" é obrigatório');
    }
    if (name.length < 3) {
        throw new Error('O "name" deve ter pelo menos 3 caracteres');
    }
}

module.exports = { validName };
