const validateAgeMiddleware = (request, response, next) => {
  const { age } = request.body;
  if (!age) return response.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (Number(age) < 18) {
    return response.status(400).json({ message: 'O crush deve ser maior de idade' });
  }
  next();
};

module.exports = validateAgeMiddleware;