const CustomError = require('./CustomError');

function validateToken(req, _res, next) {
    const token = req.header('Authorization');
    try {
      if (!token) {
        throw new CustomError(401, 'Token não encontrado');
      }
      if (token.length !== 16) {
        throw new CustomError(401, 'Token inválido');
      }
      next();
    } catch (error) {
        console.log(error);
        next(error);
    }
  }

  module.exports = validateToken;