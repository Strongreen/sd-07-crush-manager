const { passValidate, mailValidate } = require('../validations');

const loginMiddleware = (req, res, next) => {
  const { password, email } = req.body;
  try {
    passValidate(password);
    mailValidate(email);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
  next();
};

module.exports = loginMiddleware;
