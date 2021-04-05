const validateRateRangeMiddleware = (request, response, next) => {
  const { date } = request.body;
  if (Number(date.rate) < 1 || Number(date.rate) > 5) {
    return response.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' }); 
  }
  next();
};

module.exports = validateRateRangeMiddleware;