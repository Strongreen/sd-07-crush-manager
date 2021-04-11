const CustomError = require('./CustomError');

function validateDateAtERate(date) {
    const regex = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;
    if (!(Number(date.rate) >= 1 && Number(date.rate) <= 5)) {
        throw new CustomError(400, 'O campo "rate" deve ser um inteiro de 1 à 5');
    }
    if (!regex.test(date.datedAt)) {
        throw new CustomError(400, 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"');
    }
  }

function validateDate(req, _res, next) {
    const { date } = req.body;
    try {
        if (date === undefined || date.datedAt === undefined || date.rate === undefined) {
            throw new CustomError(400,
                'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios');
            }
    validateDateAtERate(date);

    next();
    } catch (error) {
        console.log(error);
        next(error);
    }
  }

  module.exports = validateDate;
