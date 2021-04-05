const fs = require('fs').promises;
const verifyToken = require('./Middleware/verifytoken');

function validateName(req, res, next) {
  const { name } = req.body;
  if (name === undefined) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
}

function validateAge(req, res, next) {
  const { age } = req.body;
  if (age === undefined) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (parseInt(age, 10) < 18) {
    return res.status(400).json({ message: 'O crush deve ser maior de idade' });
  }
  next();
}

function checkDate(req, res, next) {
  const { date } = req.body;
  if (date === undefined || date.datedAt === undefined || date.rate === undefined) {
    return res.status(400).json({ 
      message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }
  next();
}

function validateDate(req, res, next) {
  const { date } = req.body;
  const reg = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;
  if (!(parseInt(date.rate, 10) >= 1 && parseInt(date.rate, 10) <= 5)) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (!reg.test(date.datedAt)) {
    return res.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
}

module.exports = function postCrushes(app) {
  app.post('/crush', verifyToken, validateName, 
  validateAge, checkDate, validateDate, async (req, res) => {
    try {
      console.log('huh');
      const data = await fs.readFile('./crush.json');
      const response = JSON.parse(data);
      response.push(req.body);
      const result = { ...req.body, id: 5 };
      const total = JSON.stringify([result, ...response]);
      await fs.writeFile('./crush.json', total);
      console.log('tis gone');
      return res.status(201).json(result);
    } catch (error) {
      console.log(error);
    }
  });
};