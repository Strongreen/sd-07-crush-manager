module.exports = (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).send({ message: 'O campo "email" é obrigatório' });
  }
  const regEmail = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
  if (!regEmail.test(email)) {
    return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};
