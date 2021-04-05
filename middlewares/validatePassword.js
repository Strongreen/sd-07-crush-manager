const validatePassword = (req, res, next) => {
  const { password } = req.body;
  const strPassword = `${password}`;
  
  if (!password) {
    return res.status(400).json({
      message: 'O campo "password" é obrigatório',
    });
  }

  if (strPassword.length < 6) {
    return res.status(400).json({
      message: 'A "senha" deve ter pelo menos 6 caracteres',
    });
  }
  next();
};

module.exports = validatePassword;
