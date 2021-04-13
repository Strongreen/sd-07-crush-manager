// const crypto = require('crypto');

// const tokenGenerator = () => crypto.randomBytes(8).toString('hex');

// const loginMiddleware = (req, res, next) => {
//   const regexEmail = /^(\s?[^\s,]+@[^\s,]+\.[^\s,]+\s?,)*(\s?[^\s,]+@[^\s,]+\.[^\s,]+)$/;

//   if (!req.boby.email) return res.status(400).send({
//     message: 'O campo "email" é obrigatório'
//   });
  
//   if (!regexEmail.test(req.boby.email)) return res.status(400).send({
//     message: 'O "email" deve ter o formato "email@email.com"'
//   });

//   if (!req.boby.password) return res.status(400).send({
//     message: 'O campo "password" é obrigatório'
//   });

//   if (req.boby.password.length < 6) return res.status(400).send({
//     message: 'A "senha" deve ter pelo menos 6 caracteres'
//   });

//   const token = tokenGenerator();

//   res.send({ token });

//   next();
// };

// module.exports = loginMiddleware;
