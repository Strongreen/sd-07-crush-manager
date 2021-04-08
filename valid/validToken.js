function validTokenFunction(authorization, response) {
  if (!authorization) {
    response.status(401).send({
      message: 'Token não encontrado',
    });
    throw new Error('Token não encontrado');
  }
  if (authorization.length !== 16) {
    response.status(401).send({
      message: 'Token inválido',
    });
    throw new Error('Token inválido');
  }
}

module.exports = { validTokenFunction };