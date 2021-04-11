const dateMiddleware = (req, res, next) => {
  const { date } = req.body;
  // https://stackoverflow.com/questions/15491894/regex-to-validate-date-format-dd-mm-yyyy
  const valiDate = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/
  .test(date.datedAt);
  if (!date || !date.datedAt || date.rate === undefined) {
    return res.status(400).json({ 
      message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    });
}
  if (!valiDate) {
    return res.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

module.exports = dateMiddleware;