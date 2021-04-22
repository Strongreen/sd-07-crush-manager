const validDate = (req, res, next) => {
    const { date } = req.body;
    const patternData = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
    // disponivel em: https://stackoverflow.com/questions/5465375/javascript-date-regex-dd-mm-yyyy
  
    if (patternData.test(date.datedAt === false)) {
      return res.status(400)
        .send('O campo "datedAt" deve ter o formato "dd/mm/aaaa"');
    }
  next();
};

module.exports = validDate;