const BAD_REQUEST = 400;
const validateEmailMiddleware = (request, response, next) => {
  const { email } = request.body;
  try {
    if (!email) throw new Error('O campo "email" é obrigatório');

    const regexEmail = /\S+@\S+\.\S+/;

    if (!regexEmail.test(email)) {
      throw new Error('O "email" deve ter o formato "email@email.com"');
    }
    
    next();
  } catch (error) {
    response.status(BAD_REQUEST).json({ message: error.message });
  }
};

module.exports = validateEmailMiddleware;