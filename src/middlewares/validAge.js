const validAge = (req, res, next) => {
    const { age } = req.body;
    
    if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    if (age < 18) res.status(400).json({ message: 'O crush deve ser maior de idade' });
    else next();
  };
  
  module.exports = validAge;