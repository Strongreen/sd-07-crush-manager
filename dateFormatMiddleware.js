const dateMiddleware = (req, res, next) => {
  const { date } = req.body;
  
  const regex = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
  const dataValidation = regex.test(date.datedAt);
  if (!dataValidation) {
    return res.status(400).send({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

module.exports = dateMiddleware;
