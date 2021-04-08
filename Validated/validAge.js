const NOTFOUND = 400;

function validAge(age, res) {
    if (!age) return res.status(NOTFOUND).send({ message: 'O campo "age" é obrigatório' });
    if (age < 18) {
      return res.status(NOTFOUND).send({ message: 'O crush deve ser maior de idade' });
    }
}

module.exports = { validAge };
