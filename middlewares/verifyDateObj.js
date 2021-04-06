const verifyDateObj = (req, res, next) => {
    const { date } = req.body;
    const { datedAt, rate } = date;
    if (!/^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/.test(datedAt)) {
 return res.status(400).send({
        message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"',
      }); 
}
    if (rate < 1 || rate > 5 || typeof rate !== 'number') {
 return res.status(400).send({
        message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    }); 
}

next();
};

module.exports = verifyDateObj;