function validateToken(req, res, next) {
  const TOKEN_ERROR = 401;
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(TOKEN_ERROR).json({ message: 'Token não encontrado' });
  } else if (authorization.length < 16) {
    res.status(TOKEN_ERROR).json({ message: 'Token inválido' });
  } else {
    next();
  }
}

module.exports = validateToken;
