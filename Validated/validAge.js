function validAge(age) {
    if (!age) {
      throw new Error('O campo "age" é obrigatório');
    }
    if (age < 18) {
      throw new Error('O crush deve ser maior de idade');
    }
}

module.exports = { validAge };
