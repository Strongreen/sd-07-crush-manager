const UNAUTHORIZED = 401;

const erroToken = {
  NULL: 'Token não encontrado',
  INVALID: 'Token inválido',
};

module.exports = (request, response, next) => {
  const { authorization: token } = request.header;
  if (!token) {
 return response.status(UNAUTHORIZED)
    .json({ message: erroToken.NULL });
  }
  if (token.length !== 16) {
 return response.status(UNAUTHORIZED)
    .json({ message: erroToken.INVALID });
  }
  next();
};