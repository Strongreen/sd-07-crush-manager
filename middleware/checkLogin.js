module.exports = (req, res, next) => {
  const { email, password } = req.body;
  // check email
  const emailRegex = /^\S+@\S+$/;
  if (!email || email.length === 0) {
    return res.status(400).send({ message: 'O campo "email" é obrigatório' });
  }
  if (!emailRegex.test(email)) {
    return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  // check password
  if (!password || password.length === 0) {
    return res.status(400).send({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).send({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }
  next();
};
