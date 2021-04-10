function isValidName(request, response, next) {
  const { name } = request.body;
  const isEmpy = !undefined && !name;
  const invalid = !isEmpy && name.length < 3;

  if (isEmpy) {
    response.status(400).send({
      message: 'O campo "name" é obrigatório',
    });
  } else if (invalid) {
    response.status(400).send({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  } else {
    next();
  }
}

module.exports = isValidName;
