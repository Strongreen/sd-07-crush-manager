const { ApiMessages, ApiStatus } = require('../enums');

const authMiddleWare = function (req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(ApiStatus.ERROR_UNAUTHORIZED).json({ message: ApiMessages.TOKEN_NOT_FOUND });
  } else if (authorization.length < 16) {
    res.status(ApiStatus.ERROR_UNAUTHORIZED).json({ message: ApiMessages.UNAUTHORIZED_TOKEN });
  }

  next();
};

module.exports = authMiddleWare;
