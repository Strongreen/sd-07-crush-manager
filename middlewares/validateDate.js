const validateDateMiddleware = (request, response, next) => {
  const { date } = request.body;
  if (!date || date.rate === undefined || !date.datedAt) {
    return response.status(400)
    .json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }
  next();
};

module.exports = validateDateMiddleware;