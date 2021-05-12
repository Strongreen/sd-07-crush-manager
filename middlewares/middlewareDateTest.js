const messageDateDatedAtRate = {
  message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
};

const middlewareDateTest = (req, res, next) => {
  if (req.body.date === undefined || Object.keys(req.body.date).length === 0) {
    return res.status(400).send(messageDateDatedAtRate);
  }
  next();
};

module.exports = {
  middlewareDateTest,
};
