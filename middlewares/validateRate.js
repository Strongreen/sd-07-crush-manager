const BAD_REQUEST = 400;
const maxRateLimit = 5;
const validateRateMiddleware = (request, response, next) => {
  const { date: { rate } } = request.body;
  
  try {
    if (rate === undefined) {
      throw new Error('O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios');
    }  
    
    if (rate < 1 || rate > maxRateLimit) {
      throw new Error('O campo "rate" deve ser um inteiro de 1 à 5');
    }
      
    next();
  } catch (error) {
    response.status(BAD_REQUEST).json({ message: error.message });
  }
};

module.exports = validateRateMiddleware;