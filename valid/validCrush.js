function validNameFunction(request, response, next) {
  const { name } = request.body;
  if (!name) {
    return response.status(400).json({
      message: 'O campo "name" é obrigatório',
    });
  }

  if (name.length < 3) {
    return response.status(400).json({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }
  next();
}

function validAgeFunction(request, response, next) {
  const { age } = request.body;
  if (!age) {
    return response.status(400).json({
      message: 'O campo "age" é obrigatório',
    });
  }

  if (age < 18) {
    return response.status(400).json({
      message: 'O crush deve ser maior de idade',
    });
  }
  next();
}

module.exports = { validNameFunction, validAgeFunction };