const dateMiddleware = (req, res, next) => {
  const { date } = req.body;
  const isDateExist = !date || !date.datedAt || (!date.rate && date.rate !== 0);
  if (isDateExist) {
    return res.status(400).send({
      message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    }); 
}
  next();
};

module.exports = dateMiddleware;
