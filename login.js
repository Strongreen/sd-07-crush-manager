const SUCESS = 200;

const validateEmail = (mail) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(mail);
};

const validatePassword = (secret) => {
  if (secret && secret.length >= 6) {
    return true;
  } return false;
};

const rand = () => Math.random(0).toString(36).substr(2);
const token = (length) => (rand() + rand() + rand() + rand().substr(0, length));

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const isEmailValid = validateEmail(email);
  const isPasswordValid = validatePassword(password);

  if (!email) {
    res.status(400).json({ message: 'O campo "email" é obrigatório' });
  } else if (!isEmailValid) {
    res.status(400).json({ message: 'O campo "email" deve ter o formato "email@email.com"' });
  } else if (!password) {
    res.status(400).json({ message: 'O campo "senha" é obrigatório' });
  } else if (!isPasswordValid) {
    res.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  } else {
    res.status(SUCESS).json({ token: `${token(16)}` });
  }
  next();
};

module.exports = {
  login,
};
