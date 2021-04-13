const UNAUTHORIZED = 401;
const minimumTokenLength = 16;

const validateTokenMiddleware = (request, response, next) => {
  const { authorization } = request.headers;
  
  try {
    if (!authorization) throw new Error('Token não encontrado'); 

    if (authorization.length < minimumTokenLength) {
      throw new Error('Token inválido');
    }
    next();
  } catch (error) {
    response.status(UNAUTHORIZED).json({ message: error.message });
  }
};

module.exports = validateTokenMiddleware;