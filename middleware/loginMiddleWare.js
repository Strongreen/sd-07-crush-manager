const { ApiMessages, ApiStatus } = require('../enums');

const loginMiddleWare = function (req, res, next) {
  const six = 6;
  const regex = /\b[\w-]+@[\w-]+\w{2,4}\b/gi;
  const { email, password } = req.body;

  if (!email) {
    res.status(ApiStatus.BAD_REQUEST).json({ message: ApiMessages.EMAIL_MISSING });
  } else if (!regex.test(email)) {
    res.status(ApiStatus.BAD_REQUEST).json({ message: ApiMessages.EMAIL_WRONG_FORMAT });
  } else if (!password) {
    res.status(ApiStatus.BAD_REQUEST).json({ message: ApiMessages.PASSWORD_MISSING });
  } else if (password.toString().length < six) {
    res.status(ApiStatus.BAD_REQUEST).json({ message: ApiMessages.PASSWORD_WRONG_FORMAT });
  }

  next();
};

module.exports = loginMiddleWare;
