function validTokenFunction(Authorization, response) {
  if (!Authorization) {
    response.status(401).send({
      message: 'Token não encontrado',
    });
    throw new Error('Token não encontrado');
  }
}

module.exports = { validTokenFunction };