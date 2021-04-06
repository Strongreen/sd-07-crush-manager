const verifyToken = (token) => {
  const regexToken = /^(\d|\w){16}$/gm;
  return regexToken.test(token);
};

const tokenMiddleware = (req, res, next) => {
  const { authorization: token } = req.headers;
  const validToken = verifyToken(token);

  if (!token) return res.status(401).json({ message: 'Token não encontrado' });
  if (!validToken) return res.status(401).json({ message: 'Token inválido' });
  
  return next();
};

module.exports = { tokenMiddleware };
