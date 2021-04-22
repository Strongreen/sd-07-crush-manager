const {
  ageValidate,
  dateValidate,
  nameValidate,
} = require('../validations');

const dataValidations = (req, res, next) => {
  const { name, age, date } = req.body;
  try {
    ageValidate(age);
    dateValidate(date);
    nameValidate(name);
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ message: error.message });
  }
  return next();
};

module.exports = dataValidations;