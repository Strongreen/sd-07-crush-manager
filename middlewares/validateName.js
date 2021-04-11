const CustomError = require('./CustomError');

function validateName(req, _res, next) {
  const { name } = req.body;
    try {
        if (!name) {
            throw new CustomError(400, 'O campo "name" é obrigatório');
          }
          if (name.length < 3) {
            throw new CustomError(400, 'O "name" deve ter pelo menos 3 caracteres');
          }
          next();
    } catch (error) {
        console.log(error);
        next(error);
    }
  }

  module.exports = validateName;
