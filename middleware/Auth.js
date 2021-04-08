const SEM_AUTORIZACAO = 401;

const Auth = (request, _response, next) => {
  try {
    if (!request.headers.authorization) {
      throw new Error('Token não encontrado');
    }
    const { authorization } = request.headers;
    if (authorization.length !== 16) {
      throw new Error('Token inválido');
    }
    return next();
  } catch (error) {
    console.log(error);
    next({
      status: SEM_AUTORIZACAO,
      message: error.message,
    });
  }
};

module.exports = Auth;
