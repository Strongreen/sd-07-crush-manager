const dateCheck = (req, res, next) => {
  const { body: { date, date: { datedAt }, date: { rate } } } = req;

  if (!date || !datedAt || typeof rate !== 'number') {
    return res.status(400)
      .json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }

  next();
};

module.exports = { dateCheck };
