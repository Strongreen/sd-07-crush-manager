const { ApiMessages, ApiStatus } = require('../enums');

const crushInfoMiddleWare = function (req, res, next) {
  const adultAge = 18;
  const minimum = 3;
  const { name, age } = req.body;

  if (!name) {
    res.status(ApiStatus.BAD_REQUEST).json({ message: ApiMessages.NAME_MISSING });
  } else if (name.length < minimum) {
    res.status(ApiStatus.BAD_REQUEST).json({ message: ApiMessages.NAME_WRONG_FORMAT });
  } else if (!age) {
    res.status(ApiStatus.BAD_REQUEST).json({ message: ApiMessages.AGE_MISSING });
  } else if (age < adultAge) {
    res.status(ApiStatus.BAD_REQUEST).json({ message: ApiMessages.UNDER_AGED });
  } 
  next();
};

module.exports = crushInfoMiddleWare;