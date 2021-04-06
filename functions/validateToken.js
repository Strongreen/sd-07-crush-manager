const { UNAUTHORIZED } = require('../consts');

module.exports = (token, res) => {
  if (!token) {
    return res
      .status(UNAUTHORIZED)
      .json({ message: 'Token não encontrado' });
  } if (token.length < 16) {
    return res
      .status(UNAUTHORIZED)
      .json({ message: 'Token inválido' });
  }
};
