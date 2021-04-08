const SEM_AUTORIZACAO = 401;

const Auth = (request, response, next) => {
  const { authorization } = request.headers;

  if (!authorization)
    return response.status(SEM_AUTORIZACAO).send({
      message: 'Token não encontrado',
    });

  if (authorization.length !== 16)
    return response.status(SEM_AUTORIZACAO).send({
      message: 'Token inválido',
    });

  return next();
};

module.exports = Auth;
