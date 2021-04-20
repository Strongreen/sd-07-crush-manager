const validFormat = (datedAt) => {
  const patternData = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
  // disponivel em: https://stackoverflow.com/questions/5465375/javascript-date-regex-dd-mm-yyyy

  if (patternData.test(datedAt !== true)) {
    throw new Error('O campo "datedAt" deve ter o formato "dd/mm/aaaa"');
  }
};

const validDate = (req, res, next) => {
  const { date } = req.body;

  if (!date) {
    return res.status(400)
      .send({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }
  if (date === undefined || date.rate === undefined || date.datedAt === undefined) {
    throw new Error('O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios');
  }
  validFormat(date.datedAt);
  next();
};

module.exports = validDate;