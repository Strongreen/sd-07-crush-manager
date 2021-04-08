const NOTFOUND = 400;

function validPassword(password, res) {
  if (!password) return res.status(NOTFOUND).send({ message: 'O campo "password" é obrigatório' });
  if (password.length < 6) {
    return res.status(NOTFOUND).send({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }
}

module.exports = { validPassword };
