const middlewareDatedAtTest = (req, res, next) => {
  const { datedAt } = req.body.date;
  if (datedAt === undefined) {
    return res.status(ERROR).send(messageDateDatedAtRate);
  } if (!validatorDate.test(datedAt)) {
    return res.status(ERROR).send({
      message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  next();
};

module.exports = {
  middlewareDatedAtTest,
};
