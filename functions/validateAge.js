const { BAD_REQUEST } = require('../consts');

module.exports = (age, res) => {
  const OLDER = 18;
  if (!age) {
    return res
      .status(BAD_REQUEST)
      .json({ message: 'O campo "age" é obrigatório' });
  } if (age < OLDER) {
    return res
      .status(BAD_REQUEST)
      .json({ message: 'O crush deve ser maior de idade' });
  }
};
