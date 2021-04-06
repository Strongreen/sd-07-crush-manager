const verifyDate = (req, res, next) => {
    const { date } = req.body;
    const rateIsNumber = date.rate === 0; 
    if (!date || !date.datedAt || !rateIsNumber) {
 return res.status(400).send({
    message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
      }); 
}

next();
};

module.exports = verifyDate;