const validateAge = (request, response, next) => {
  const { age } = request.body;
  if (!age) return response.status(400).send({ message: 'O campo "age" é obrigatório' });
  if (age < 18) return response.status(400).send({ message: 'O crush deve ser maior de idade' });

  next();
};

module.exports = validateAge;
