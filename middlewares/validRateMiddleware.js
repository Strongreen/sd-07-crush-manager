const status = require('../helpers/status');

const validRateMiddleware = (request, response, next) => {
  const { date } = request.body;

  const isRateNotNumber = typeof rate !== 'number';
  const validRate = /^[1-5]/;

  if (isRateNotNumber || !validRate.test(date.rate.toString())) {
 return response.status(status.BAD_REQUEST).json(
    { message: 'O campo "rate" deve ser um inteiro de 1 à 5' },
    ); 
}

  next();
};

module.exports = validRateMiddleware;
