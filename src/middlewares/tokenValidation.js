function tokenValidation(request, response, next) {
  const { token } = request.headers;
  if (!token) {
    return response.status(401).json({ message: 'Token não encontrado' });
}
  if (token.length !== 16) {
    return response.status(401).json({ message: 'Token inválido' });
}
 return next();
}

module.exports = tokenValidation;
