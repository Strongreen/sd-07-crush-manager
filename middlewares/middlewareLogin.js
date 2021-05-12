const path = require('path');
const fs = require('fs');

const middlewareLogin = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({ message: 'Token não encontrado' });
  } if (authorization.length < 16) {
    return res.status(401).send({ message: 'Token inválido' });
  }
  next();
};

const writeFile = async (param) => (
  fs.writeFile(
    path.resolve(__dirname, '.', 'crush.json'),
    JSON.stringify(param),
    (err) => {
      if (err) throw err;
    },
  )
);

module.exports = {
  middlewareLogin,
  writeFile,
};
