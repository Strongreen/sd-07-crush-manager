const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization && authorization.length === 16) return next();
  return res.status(400).send({ message: 'Invalid authorization' });
};

module.exports = authMiddleware;
