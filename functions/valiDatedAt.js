const { BAD_REQUEST } = require('../consts');

module.exports = (datedAt, res) => {
  const regexDateFormat = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
  if (!datedAt) {
    return res
      .status(BAD_REQUEST)
      .json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  } 
  if (!regexDateFormat.test(datedAt)) {
    return res
      .status(BAD_REQUEST)
      .json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  } 
};