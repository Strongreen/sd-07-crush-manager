const errors = {
    NAME_MISSING: 'O campo "name" é obrigatório',
    NAME_INVALID: 'O "name" deve ter pelo menos 3 caracteres',
    AGE_MISSING: 'O campo "age" é obrigatório',
    AGE_INVALID: 'O crush deve ser maior de idade',
    DATE_MISSING: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    DATED_INVALID: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"',
    RATE_INVALID: 'O campo "rate" deve ser um inteiro de 1 à 5',
  };
  
  const minimumAge = 18;
  const dateFormat = /\d{2}[/]\d{2}[/]\d{4}/;
  
  const isInvalidDate = (date) => !date || !date.datedAt || (!date.rate && date.rate !== 0);
  
  module.exports = {
    validateCrush: (req, res, next) => {
      const { name, age } = req.body;
  
      if (!name) return res.status(400).json({ message: errors.NAME_MISSING });
      if (name.length < 3) return res.status(400).json({ message: errors.NAME_INVALID });
  
      if (!age) return res.status(400).json({ message: errors.AGE_MISSING });
      if (age < minimumAge) return res.status(400).json({ message: errors.AGE_INVALID });
      next();
    },
    validateDate: (req, res, next) => {
      const { date } = req.body;
  
      if (isInvalidDate(date)) return res.status(400).json({ message: errors.DATE_MISSING });
  
      const { datedAt, rate } = date;
      if (!dateFormat.test(datedAt)) return res.status(400).json({ message: errors.DATED_INVALID });
      if (rate < 1 || rate > 5) return res.status(400).json({ message: errors.RATE_INVALID });
      next();
    },
  }; 
