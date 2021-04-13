const BAD_REQUEST = 400;
const minimumPasswordLength = 6;
const validatePasswordMiddleware = (request, response, next) => {
  const { password } = request.body;
  try {
    if (!password) throw new Error('O campo "password" é obrigatório'); 

    if (password.length < minimumPasswordLength) {
      throw new Error('A "senha" deve ter pelo menos 6 caracteres');
    }
    next();
  } catch (error) {
    response.status(BAD_REQUEST).json({ message: error.message });
  }
};

module.exports = validatePasswordMiddleware;