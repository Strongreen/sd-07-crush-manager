const { ApiMessages, ApiStatus } = require('../enums');

const dateInfoMiddleWare = function (req, res, next) {
  const { date } = req.body;
  
  if (!date) {
    res.status(ApiStatus.BAD_REQUEST).json({ message: ApiMessages.DATE_MISSING });
  } else if (date.rate < 1 || date.rate > 5) {
    res.status(ApiStatus.BAD_REQUEST).json({ message: ApiMessages.WRONG_RATE });
  }
  
  next();
};

module.exports = dateInfoMiddleWare;