const validDate = (req, res, next) => {
  const { date } = req.body;

  if (!date || !date.datedAt || typeof date.rate !== 'number') {
    return res
      .status(400)
      .json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }
  next();
};

module.exports = validDate;
