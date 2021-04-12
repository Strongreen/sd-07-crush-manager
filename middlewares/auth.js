const UNAUTH = 401;

const checkToken = (token) => {
  const SIZE = 16;
  return token.length === SIZE;
};

const throwError = (check, message) => {
  if (check) {
    throw new Error(message);
  }
};

const auth = (req, _res, next) => {
  try {
    const { authorization } = req.headers;
    throwError(!authorization, 'Token não encontrado');
    throwError(!checkToken(authorization), 'Token inválido');
    return next();
  } catch (error) {
    return next({ status: UNAUTH, resp: error.message });
  }
};

module.exports = auth; 
