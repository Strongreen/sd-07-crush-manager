const middlewareRateTest = (req, res, next) => {
  const { rate } = req.body.date;
  if (rate === undefined) {
    return res.status(ERROR).send(messageDateDatedAtRate);
  } if (rate < 1 || rate > 5) {
    return res.status(ERROR).send({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }
  next();
};

module.exports = {
  middlewareRateTest,
};
