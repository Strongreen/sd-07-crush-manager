module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).send({ message: 'Token não encontrado' });
  }

  if (token.length !== 16) {
    res.status(401).send({ message: 'Token inválido' });
  }
  next();
};
