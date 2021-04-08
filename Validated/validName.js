const NOTFOUND = 400;

function validName(name, res) {
    if (!name) return res.status(NOTFOUND).send({ message: 'O campo "name" é obrigatório' });
    if (name.length < 3) {
        return res.status(NOTFOUND).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
}

module.exports = { validName };
