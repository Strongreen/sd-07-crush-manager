const dateAtCheck = (req, res, next) => {
  const { body: { date } } = req;
  const formatDate = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;

  if (!date.datedAt || date.datedAt === '') {
    return res.status(400)
      .json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }

  if (!date.datedAt.match(formatDate)) {
    return res.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

module.exports = { dateAtCheck };
