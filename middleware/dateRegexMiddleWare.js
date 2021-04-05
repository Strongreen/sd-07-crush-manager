const { ApiMessages, ApiStatus } = require('../enums');

const dateRegexMiddleWare = function (req, res, next) {
  const regex = /(0?[1-9]|[12][0-9]|3[01])[-/.](0?[1-9]|1[012])[- /.](19|20)?\d\d/gm;
  const { date } = req.body;

  if (!date || !date.rate || !date.datedAt) {
    return res.status(ApiStatus.BAD_REQUEST).json({ message: ApiMessages.DATE_MISSING });
  } if (!regex.test(date.datedAt)) {
    return res.status(ApiStatus.BAD_REQUEST).json({ message: ApiMessages.DATED_AT_WRONG_FORMAT });
  }

  next();
};

module.exports = dateRegexMiddleWare;