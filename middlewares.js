const { isValidEmail, isValidPassword, isValidToken } = require('./services/loginService');

exports.validateEmailMiddleware = (req, res, next) => {
    const emailErrorCode400 = { message: 'O campo "email" é obrigatório' };
    const invalidEmailErrorCode400 = { message: 'O "email" deve ter o formato "email@email.com"' };
    const { email } = req.body;
    if (!email || email === '') return res.status(400).send(emailErrorCode400);
    if (!isValidEmail(email)) return res.status(400).send(invalidEmailErrorCode400);
    next();
};

exports.validatePasswordMiddleware = (req, res, next) => {
    const passwordNotFoundError = { message: 'O campo "password" é obrigatório' };
    const invalidPasswordError = { message: 'A "senha" deve ter pelo menos 6 caracteres' };
    const { password } = req.body;
    if (!password || password === '') return res.status(400).send(passwordNotFoundError);
    if (!isValidPassword(password)) return res.status(400).send(invalidPasswordError);
    next();
};

exports.validateTokenMiddleware = (req, res, next) => {
    const tokenNotFoundError = { message: 'Token não encontrado' };
    const invalidTokenError = { message: 'Token inválido' };
    const { token } = req.headers;
    if (!token) return res.status(401).send(tokenNotFoundError);
    if (!isValidToken(token)) return res.status(401).send(invalidTokenError);
    next();
};

exports.errorMiddleware = (err, _req, res, _next) => 
     res.status(err.status).send({ message: err.message });

/*
{
  "message": "O campo \"name\" é obrigatório"
}
{
  "message": "O \"name\" deve ter pelo menos 3 caracteres"
}

{
  "message": "O campo \"age\" é obrigatório"
}
{
  "message": "O crush deve ser maior de idade"
}

{
  "message": "O campo \"datedAt\" deve ter o formato \"dd/mm/aaaa\""
}

{
  "message": "O campo \"rate\" deve ser um inteiro de 1 à 5"
}

O campo date é obrigatório e nenhuma das chaves citadas anteriormente podem ser vazias.

Caso o campo não seja informa, esteja vazio ou então alguma de suas chaves não tenham sido informadas retorne status 400, com o seguinte corpo:

{
  "message": "O campo \"date\" é obrigatório e \"datedAt\" e \"rate\" não podem ser vazios"
}
*/