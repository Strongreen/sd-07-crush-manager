const validDate = (req, res, next) => {
  const { date } = req.body;

  if (!date) {
    return res.status(400)
      .send({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }
  if (date === undefined || date.rate === undefined || date.datedAt === undefined) {
    return res.status(400)
      .send('O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios');
  }
  next();
};

module.exports = validDate;