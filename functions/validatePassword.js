const { BAD_REQUEST } = require('../consts');

module.exports = (password, res) => {
  if (!password) {
    return res
      .status(BAD_REQUEST)
      .json({ message: 'O campo "password" é obrigatório' });
  } if (password.length < 6) {
    return res
      .status(BAD_REQUEST)
      .json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }
};