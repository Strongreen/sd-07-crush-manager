const findToken = (authorization) => {
  if (!authorization) {
    throw new Error('Token não encontrado');
  }
};

const validToken = (authorization) => {
  if (authorization.length !== 16) {
    throw new Error('Token inválido');
  }
};

const authorizationMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  try {
    findToken(authorization);
    validToken(authorization);
  } catch (error) {
    res.status(401).send({
      message: error.message,
    });
  }

  next();
};

module.exports = authorizationMiddleware;
