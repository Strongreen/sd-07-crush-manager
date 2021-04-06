const { BAD_REQUEST } = require('../consts');

module.exports = (email, res) => {
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (!email) {
    return res
      .status(BAD_REQUEST)
      .json({ message: 'O campo "email" é obrigatório' });
  } if (!regex.test(email)) {
    return res
      .status(BAD_REQUEST)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
};