const authEmail = (email) => {
  const validationEmail = new RegExp('@');
  if (!email) {
    return {
      message: 'O campo "email" é obrigatório',
    };
  }
  if (!validationEmail.test(email)) {
    return {
      message: 'O "email" deve ter o formato "email@email.com"',
    };
  }
};
const authPassword = (password) => {
  if (!password) {
    return {
      message: 'O campo "password" é obrigatório',
    };
  }
  if (password.length < 6) {
    return {
      message: 'A "senha" deve ter pelo menos 6 caracteres',
    };
  }
};

const authMiddleware = (req, res, next) => {
  const { password } = req.body;
  const { email } = req.body;
  const returnAuthEmail = authEmail(email);
  if (returnAuthEmail) {
    return res.status(400).send(returnAuthEmail);
  }
  const returnAuthPassword = authPassword(password);
  if (returnAuthPassword) {
    return res.status(400).send(returnAuthPassword);
  }
  next();
};

module.exports = authMiddleware;
