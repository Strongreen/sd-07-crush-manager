const minimumNameLength = 3;
const BAD_REQUEST = 400;
const validateNameMiddleware = (request, response, next) => {
  const { name } = request.body;

  try {
    if (!name) throw new Error('O campo "name" é obrigatório'); 

    if (name.length < minimumNameLength) {
      throw new Error('O "name" deve ter pelo menos 3 caracteres');
    }
    
    next();
  } catch (error) {
    response.status(BAD_REQUEST).json({ message: error.message });
  }
};

module.exports = validateNameMiddleware;