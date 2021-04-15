const passwordMiddleware = (req, res, next) => {
  const { password } = req.body;
  const validatedPassword = (password) => /^\d{6,12}$/gm.test(password);

  if (!password || password === '') {
    res.status(400).send({
      message: 'O campo "password" é obrigatório',
    });
  } else if (!validatedPassword(password)) {
    res.status(400).send({
      message: 'A "senha" deve ter pelo menos 6 caracteres',
    });
  } else {
    next();
  }
};

module.exports = passwordMiddleware;
