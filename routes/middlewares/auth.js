module.exports = (req, res, next) => {
  const { auth } = req.headers;
  if (!auth) return res.status(401).json({ message: 'Token não encontrado' });
  if (auth.length < 16) return res.status(401).json({ message: 'Token inválido' });
  next();
};
