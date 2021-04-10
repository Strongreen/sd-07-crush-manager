function hasToken(request, response, next) {
  const { authorization } = request.headers;
  const isEmpy = !authorization;
  const isValid = !!authorization && authorization.length === 16;
  
  if (isEmpy) {
    response.status(401).send({
      message: 'Token não encontrado',
    });
  } else if (!isValid) {
    response.status(401).send({
      message: 'Token inválido',
    });
  } else {
    next();
  }
}

module.exports = hasToken;
