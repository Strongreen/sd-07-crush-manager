const validate = require('../validations');

const {
  nameValidate,
  ageValidate,
  datedAtValidate,
  rateValidate,
  dateValidate,
} = validate;

const validationsMiddleware = (req, res, next) => {
  const { name, age, date } = req.body;
  try {
    nameValidate(name);
    ageValidate(age);
    dateValidate(date);
    const { datedAt, rate } = date;
    datedAtValidate(datedAt);
    rateValidate(rate);
  } catch (error) {
    next({
        status: 400,
        message: error.message,
      });
    }
  next();
};

module.exports = validationsMiddleware;