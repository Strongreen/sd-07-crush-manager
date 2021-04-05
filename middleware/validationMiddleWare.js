const { ApiMessages, ApiStatus } = require('../enums');

const validationMiddleWare = function (req, res, next) {
  const regex = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
  const adultAge = 18;
  const minimum = 3;
  const { name, age, date } = req.body;
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(ApiStatus.ERROR_UNAUTHORIZED).json({ message: ApiMessages.TOKEN_NOT_FOUND });
  } else if (authorization.length < 16) {
    res.status(ApiStatus.ERROR_UNAUTHORIZED).json({ message: ApiMessages.UNAUTHORIZED_TOKEN });
  } else if (!name) {
    res.status(ApiStatus.BAD_REQUEST).json({ message: ApiMessages.NAME_MISSING });
  } else if (name.length < minimum) {
    res.status(ApiStatus.BAD_REQUEST).json({ message: ApiMessages.NAME_WRONG_FORMAT });
  } else if (!age) {
    res.status(ApiStatus.BAD_REQUEST).json({ message: ApiMessages.AGE_MISSING });
  } else if (age < adultAge) {
    res.status(ApiStatus.BAD_REQUEST).json({ message: ApiMessages.UNDER_AGED });
  } else if (!date) {
    res.status(ApiStatus.BAD_REQUEST).json({ message: ApiMessages.DATE_MISSING });
  } else if (date.rate < 1 || date.rate > 5) {
    res.status(ApiStatus.BAD_REQUEST).json({ message: ApiMessages.WRONG_RATE });
  } else if (!date || !date.rate || !date.datedAt) {
    res.status(ApiStatus.BAD_REQUEST).json({ message: ApiMessages.DATE_MISSING });
  } else if (!regex.test(date.datedAt)) {
    res.status(ApiStatus.BAD_REQUEST).json({ message: ApiMessages.DATED_AT_WRONG_FORMAT });
  }

  next();
};

module.exports = validationMiddleWare;
