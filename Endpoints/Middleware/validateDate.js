module.exports = function validateDate(req, res, next) {
  const { date } = req.body;
  const reg = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;
  if (!(parseInt(date.rate, 10) >= 1 && parseInt(date.rate, 10) <= 5)) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (!reg.test(date.datedAt)) {
    return res.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};
