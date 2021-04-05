function validateEmail(req, res, next) {
  try {
    const { email } = req.body;
    if (email === '' || email === undefined) {
      return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    next();
  } catch (error) {
    console.log(error);
  }
}

function validatePassword(req, res, next) {
  const { password } = req.body;
  if (password === '' || password === undefined) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }
  next();
}

module.exports = function login(app) {
  app.post('/login', validateEmail, validatePassword, (req, res) =>
    res.status(200).json({ token: 'airhsurso012345a' }));
};
