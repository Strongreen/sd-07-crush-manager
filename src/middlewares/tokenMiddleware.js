const { tokenValidate } = require('../validations');

const tokenValidateMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    tokenValidate(authorization);
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ message: error.message });
  }
  next();
};

module.exports = tokenValidateMiddleware;
