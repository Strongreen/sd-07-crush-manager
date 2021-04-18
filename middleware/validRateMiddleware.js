const { status } = require('../helpers');

const validRateMiddleware = (req, res, next) => {
  const { date } = req.body;

  const isRateNotNumber = typeof date.rate !== 'number';
  console.log(isRateNotNumber);
  const validRate = /^[1-5]/;

  if (isRateNotNumber || !validRate.test(date.rate.toString())) {
 return res.status(status.BAD_REQUEST).json(
    { message: 'O campo "rate" deve ser um inteiro de 1 à 5' },
    ); 
}

  next();
};

module.exports = validRateMiddleware;