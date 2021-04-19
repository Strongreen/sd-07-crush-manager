const dateAtCheck = (req, res, next) => {
  const { body: { date: { datedAt } } } = req;
  // console.log(date);
  const formatDate = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;

  if (!datedAt.match(formatDate)) {
    return res.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

module.exports = { dateAtCheck };
