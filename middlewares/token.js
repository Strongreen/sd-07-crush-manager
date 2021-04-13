const tokenMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  const regexToken = /^(\d|\w){16}$/gm;

  if (authorization === undefined) {
    return res.status(401).send({ message: 'Token não encontrado' });
  }

  const validateToken = regexToken.test(authorization);

  if (!validateToken) {
    return res.status(401).send({ message: 'Token inválido' });
  }

  next();
};

module.exports = tokenMiddleware;
