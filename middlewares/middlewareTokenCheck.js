const tokenCheck = (req, res, next) => {
  const { headers: { authorization } } = req;

  if (!authorization || authorization === '') {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  
  const tokenLength = authorization.split(' ')[1].length;
  if (tokenLength < 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

module.exports = { tokenCheck };
