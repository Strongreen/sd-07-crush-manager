const dateCheck = (req, res, next) => {
  const { body: { date } } = req;

  if (!date || !date.datedAt || typeof date.rate !== 'number') {
    return res.status(400)
      .json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }

  next();
};

module.exports = { dateCheck };
