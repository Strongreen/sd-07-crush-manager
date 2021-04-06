const ERRO_400 = 400;

const checkedEmail = (email) => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};

const checkedEmailMidlleware = (req, res, next) => {
  const { email } = req.body;
  if (!email || email === '') {
    return res.status(ERRO_400).send({ message: 'O campo "email" é obrigatório' });
  }
  if (!checkedEmail(email)) {
    return res.status(ERRO_400)
    .send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

const checkedPasswordMidlleware = (req, res, next) => {
  const { password } = req.body;
  if (!password || password === '') { 
    return res.status(ERRO_400).send({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(ERRO_400)
    .send({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }
  next();
};

const checkedName = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(ERRO_400).send({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) { 
    return res.status(ERRO_400)
    .send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const checkedAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) return res.status(ERRO_400).send({ message: 'O campo "age" é obrigatório' });
  if (parseInt(age, 10) < 18) { 
    return res.status(ERRO_400)
    .send({ message: 'O crush deve ser maior de idade' });
  }
  next();
};

const checkedDateExists = (req, res, next) => {
  const { date } = req.body;
  if (!date || !date.rate || !date.datedAt) {
    return res.status(ERRO_400)
    .send({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }
  next();
};

const checkedDate = (req, res, next) => {
  const regex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  const { date } = req.body;
  const { datedAt, rate } = date;
  const testRate = parseInt(rate, 10);

  if (!regex.test(datedAt)) {
    return res.status(ERRO_400)
    .send({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (!(testRate >= 1 && testRate <= 5)) {
    return res.status(ERRO_400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

function verifyToken(token) {
  const tokenRegex = /^(\d|\w){16}$/gm;
  return tokenRegex.test(token);
}

const checkedTokenMiddleware = (req, res, next) => {
  const { authorization: token } = req.headers;
  if (!token) return res.status(401).send({ message: 'Token não encontrado' });
  if (!verifyToken(token)) return res.status(401).send({ message: 'Token inválido' });

  next();
};

module.exports = { checkedEmailMidlleware,
  checkedPasswordMidlleware,
  checkedName,
  checkedAge,
  checkedDateExists,
  checkedDate,
  checkedTokenMiddleware };