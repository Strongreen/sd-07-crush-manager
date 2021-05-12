const messageDateDatedAtRate = {
  message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
};

const validatorDate = /^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/]\d{4}$/;

const middlewareDatedAtTest = (req, res, next) => {
  const { datedAt } = req.body.date;
  if (datedAt === undefined) {
    return res.status(400).send(messageDateDatedAtRate);
  } if (!validatorDate.test(datedAt)) {
    return res.status(400).send({
      message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  next();
};

module.exports = {
  middlewareDatedAtTest,
};
