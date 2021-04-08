function validTokenFunction(request, response, next) {
  const { authorization } = request.headers;
  if (!authorization) {
    return response.status(401).json({
      message: 'Token não encontrado',
    });
  }

  // JSON.parse() objeto string
  // JSON.stringfy() string objeto

  if (authorization.length !== 16) {
    return response.status(401).json({
      message: 'Token inválido',
    });
  }
  next();
}

module.exports = { validTokenFunction };