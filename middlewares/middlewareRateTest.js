const messageDateDatedAtRate = {
  message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
};

const middlewareRateTest = (req, res, next) => {
  const { rate } = req.body.date;
  if (rate === undefined) {
    return res.status(400).send(messageDateDatedAtRate);
  } if (rate < 1 || rate > 5) {
    return res.status(400).send({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }
  next();
};

module.exports = {
  middlewareRateTest,
};
