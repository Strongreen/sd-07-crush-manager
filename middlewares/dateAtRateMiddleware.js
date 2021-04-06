const dateAtRateMiddleware = (req, res, next) => {
    const { date } = req.body;
    switch (true) {
      case !date || !date.datedAt || (!date.rate && date.rate !== 0):
        return res.status(400).json({
          message:
            'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
        });
      default:
        break;
    }
    next();
  };

module.exports = dateAtRateMiddleware;