const { passValidate, mailValidate } = require('../validations');

const loginMiddleware = (req, res, next) => {
  const { password, email } = req.body;
  const message1 = passValidate(password) ? passValidate(password).message : false;
  const message2 = mailValidate(email) ? mailValidate(email).message : false;
  if (message1) return res.status(400).json({ message: message1 });
  if (message2) return res.status(400).json({ message: message2 });
  next();
};

module.exports = loginMiddleware;
