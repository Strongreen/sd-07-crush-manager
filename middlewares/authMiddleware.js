module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization && authorization.toString().length > 8) {
    next();
  }
  if (!authorization) {
    res.status(401).json({ message: 'Token não encontrado' });
  } else {
    res.status(401).json({ message: 'Token inválido' });
  }
};

// logica desenvolvida ajuda da aula ao vivo Lucas Cavalcante
