const emailMidleware = (req, res, next) => {
  const { email } = req.body;
  const expectedPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return res.status(400).send({ message: 'O campo "email" é obrigatório' });
  if (email && !expectedPattern.test(email)) {
    return res.status(400).send({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
  next();
};

module.exports = emailMidleware;