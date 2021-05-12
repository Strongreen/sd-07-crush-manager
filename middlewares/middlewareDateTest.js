const middlewareDateTest = (req, res, next) => {
  if (req.body.date === undefined || Object.keys(req.body.date).length === 0) {
    return res.status(ERROR).send(messageDateDatedAtRate);
  }
  next();
};

module.exports = {
  middlewareDateTest,
};
