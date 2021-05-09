const validateToken = (request, response, next) => {
  const { authorization } = request.headers;

  if (!authorization) return response.status(401).send({ message: 'Token não encontrado' });
  const tokenTest = /.{16}/.test(authorization);
  if (!tokenTest) return response.status(401).send({ message: 'Token inválido' });

  next();
};

module.exports = validateToken;
