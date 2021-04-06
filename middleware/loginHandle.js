const verifyEmail = (email) => {
  const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return regexEmail.test(email);
};

const verifyPassword = (password) => {
  const regexPassword = /^.{6,}$/; // Reference: https://stackoverflow.com/questions/3166738
  return regexPassword.test(password);
};

const loginMiddleware = (req, res, next) => {
  const { email, password } = req.body;
  const validEmail = verifyEmail(email);
  const validPassword = verifyPassword(password);

  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (!validEmail) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!validPassword) {
    return res.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }

  return next();
};

module.exports = { verifyEmail, verifyPassword, loginMiddleware };
