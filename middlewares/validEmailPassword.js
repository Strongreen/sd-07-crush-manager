const validEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const messageError = {
  email_not_exists: 'O campo "email" é obrigatório',
  format_email: 'O "email" deve ter o formato "email@email.com"',
  password_not_exists: 'O campo "password" é obrigatório',
  password_length: 'A "senha" deve ter pelo menos 6 caracteres',
};

const infoNotExists = (value) => (!value || value.length === 0);
const isLengthLetterThan = (value, min) => (value.length < min);

const validEmailPassword = (req, res, next) => {
  const { email, password } = req.body;

  switch (true) {
    case infoNotExists(email):
      return res.status(400).json({ message: messageError.email_not_exists });
    case !validEmail(email):
      return res.status(400).json({ message: messageError.format_email });
    case infoNotExists(password):
      return res.status(400).json({ message: messageError.password_not_exists });
    case isLengthLetterThan(password):
      return res.status(400).json({ message: messageError.password_length });
    default: return next();
  }
};

module.exports = validEmailPassword;

// if (!email || email.length === 0) {
//   return res.status(400).json({ message: 'O campo "email" é obrigatório' });
// }
// if (!validEmail(email)) {
//   return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
// }
// if (!password || password.length === 0) {
//   return res.status(400).json({ message: 'O campo "password" é obrigatório' });
// }
// if (password.toString().length < 6) {
//   return res.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
// }