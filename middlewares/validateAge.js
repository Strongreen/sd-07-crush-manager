const CustomError = require('./CustomError');

function validateAge(req, _res, next) {
    const { age } = req.body;
    try {
        if (!age) {
            throw new CustomError(400, 'O campo "age" é obrigatório');
          }
          if (Number(age) < 18) {
            throw new CustomError(400, 'O crush deve ser maior de idade');
          }
          next();
    } catch (error) {
        console.log(error);
        next(error);
    }
  }

  module.exports = validateAge;
