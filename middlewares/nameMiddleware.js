const condicaoNameMiddleware = (req, res, next) => {
    const { name } = req.body;
    switch (true) {
      case !name || name === '':
        return res.status(400).json({
          message: 'O campo "name" é obrigatório',
        });
      case name.length < 3:
        return res.status(400).json({
          message: 'O "name" deve ter pelo menos 3 caracteres',
        });
      default:
        break;
    }
    next();
  };

module.exports = condicaoNameMiddleware;