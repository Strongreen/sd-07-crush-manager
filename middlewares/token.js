module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization && authorization > 15) return next();
  return res.status().send({
    message: 'Token inválido',
  });
};