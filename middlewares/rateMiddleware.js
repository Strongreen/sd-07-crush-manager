const rateMiddleware = (req, res, next) => {
  const { date } = req.body;
  if (date.rate < 1 || date.rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

module.exports = rateMiddleware;