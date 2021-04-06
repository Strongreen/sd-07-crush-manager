const { BAD_REQUEST } = require('../consts');

const checkIsNumberAndRange = (number) => number < 1 || number > 5 || Number.isNaN(number);

module.exports = (rate, res) => {
  const rateNumber = Number(rate);
  if (!rate && rateNumber !== 0) {
    return res
      .status(BAD_REQUEST)
      .json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  } if (checkIsNumberAndRange(rateNumber)) {
    return res
      .status(BAD_REQUEST)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
};
