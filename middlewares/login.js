const verifyEmail = (req, res) => {
  const regexEmail = /^(\s?[^\s,]+@[^\s,]+\.[^\s,]+\s?,)*(\s?[^\s,]+@[^\s,]+\.[^\s,]+)$/;

  if (req.body.length === 0 || req.body.email === undefined) {
    return res.status(400).send({ message: 'O campo "email" é obrigatório' });
  }
  if (!regexEmail.test(req.body.email)) {
    return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
};

const loginMiddleware = (req, res, next) => {
  verifyEmail(req, res);

  if (!req.body.password) {
    return res.status(400).send({ message: 'O campo "password" é obrigatório' });
  }
  if (req.body.password.length < 6) {
    return res.status(400).send({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }

  next();
};

module.exports = loginMiddleware;
