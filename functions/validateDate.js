const valiDatedAt = require('./valiDatedAt');
const validateRate = require('./validateRate');
const { BAD_REQUEST } = require('../consts');

module.exports = (date, res) => {
  if (!date) {
    return res
      .status(BAD_REQUEST)
      .json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }

  const { datedAt, rate } = date;
  if (valiDatedAt(datedAt, res) || validateRate(rate, res)) {
    return true;
  }
};