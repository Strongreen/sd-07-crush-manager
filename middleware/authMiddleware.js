const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization.toString().length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};
// (\.{16},\)
const dateMiddleware = (req, res, next) => {
  const { date } = req.body;
  const dateRegex = /^[0-9]{2}[/]{1}[0-9]{2}[/]{1}[0-9]{4}$/g;
  
  if (!date || !date.datedAt || date.rate === undefined) {
    return res.status(400).json(
      {
        message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
      },
    );
  }
  if (!dateRegex.test(date.datedAt)) {
    return res.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

const rateMiddleware = (req, res, next) => {
  const { date } = req.body;
  if (date.rate < 1 || date.rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

const nameAgeMiddleware = (req, res, next) => {
  const { name, age } = req.body;
  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.toString().length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (age < 18) return res.status(400).json({ message: 'O crush deve ser maior de idade' });

  next();
};

module.exports = {
  authMiddleware,
  dateMiddleware,
  nameAgeMiddleware,
  rateMiddleware,
};
