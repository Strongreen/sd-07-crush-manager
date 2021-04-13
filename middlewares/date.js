const formatDate = (datedAt) => {
  // https://www.regextester.com/99555
  const dateReg = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
  const validFormatDate = datedAt.match(dateReg);

  if (!validFormatDate) {
    throw new Error('O campo "datedAt" deve ter o formato "dd/mm/aaaa"');
  }
};

const validRate = (rate) => {
  if (rate < 1 || rate > 5) {
    throw new Error('O campo "rate" deve ser um inteiro de 1 à 5');
  }
};

const validDateInput = (date) => {
  if (!date || !date.datedAt || !date.rate) {
    throw new Error('O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios');
  }
};

const dateMiddleware = (req, res, next) => {
  const { date } = req.body;
  try {
    validDateInput(date);
    formatDate(date.datedAt);
    validRate(date.rate);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }

  next();
};

module.exports = dateMiddleware;
