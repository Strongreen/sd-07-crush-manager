const nameMiddleware = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
 return res.status(400).send({
    message: 'O campo "name" é obrigatório',
  }); 
}
  if (name.length < 3) {
 return res.status(400).send({
    message: 'O "name" deve ter pelo menos 3 caracteres',
  }); 
}
  next();
};

const ageAuthMiddleware = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
 return res.status(400).send({
    message: 'O campo "age" é obrigatório',
  }); 
}
  if (Number(age) < 18) {
 return res.status(400).send({
    message: 'O crush deve ser maior de idade',
  }); 
}
  next();
};

const dateAuthMiddleware = (req, res, next) => {
  const { date } = req.body;
  if (!date || !date.datedAt || date.rate === undefined) {
 return res.status(400)
    .send({
      message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    }); 
}
  next();
};

const datedAtMiddle = (req, res, next) => {
  const { date } = req.body;
  const dateFormat = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
  if (!dateFormat.test(date.datedAt)) {
    return res.status(400).send({
       message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"',
     }); 
   }
  next();
};

const rateMiddle = (req, res, next) => {
  const { date } = req.body;
  if (date.rate < 1 || date.rate > 5) {
  return res.status(400).send({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    }); 
  }
  next();
};

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
 return res.status(401).send({
    message: 'Token não encontrado',
  }); 
}
  if (authorization && authorization.length !== 16) {
 return res.status(401).send({
    message: 'Token inválido',
  }); 
}
  next();
};

module.exports = {
  nameMiddleware,
  ageAuthMiddleware,
  dateAuthMiddleware,
  datedAtMiddle,
  authMiddleware,
  rateMiddle,
};
