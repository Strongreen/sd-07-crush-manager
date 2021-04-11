const { throwError } = require('../routes/util');

const UNAUTHORIZED = 401;

const checkToken = (token) => {
  const SIZE_TOKEN = 16;
  return token.length === SIZE_TOKEN;
};

const authToken = (req, _res, next) => {
  try {
    const { authorization } = req.headers;
    throwError(!authorization, 'Token não encontrado');
    throwError(!checkToken(authorization), 'Token inválido');
    return next();
  } catch (error) {
    return next({ status: UNAUTHORIZED, resp: error.message });
  }
};

module.exports = authToken;