const checkToken = (req, res, next) => {
  // check header
  if (!req.headers.authorization) {
    return res.status(401).send({ message: 'Token não encontrado' });
  }
  if (req.headers.authorization !== '7mqaVRXJSp886CGr') {
    return res.status(401).send({ message: 'Token inválido' });
  }
  next();
};

module.exports = checkToken;
