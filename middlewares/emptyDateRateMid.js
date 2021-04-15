const checkDateRateMiddleware = (req, res, next) => {
  const { date } = req.body;

  if (typeof date === 'undefined') {
    res.status(400).send({
      message:
        'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    });
  }
  const { datedAt, rate } = req.body.date;
  if (typeof datedAt === 'undefined' || typeof rate === 'undefined') {
    res.status(400).send({
      message:
        'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    });
  }
  next();
};

module.exports = checkDateRateMiddleware;
