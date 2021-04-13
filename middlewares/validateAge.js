const minimumAgeLength = 18;
const BAD_REQUEST = 400;

const validateAgeMiddleware = (request, response, next) => {
  const { age } = request.body;

  try {
    if (!age) throw new Error('O campo "age" é obrigatório'); 

  if (age < minimumAgeLength) {    
    throw new Error('O crush deve ser maior de idade');
  }
  next();
  } catch (error) {
    response.status(BAD_REQUEST).json({ message: error.message });
  }
};

module.exports = validateAgeMiddleware;