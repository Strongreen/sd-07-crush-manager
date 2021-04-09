const { isValidEmail, isValidPassword } = require('./services/loginService');

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
    const invalidPasswordError = { message: 'O "password" deve ter pelo menos 6 caracteres' };
    const { password } = req.body;
    if (!password || password === '') return res.status(400).send(passwordNotFoundError);
    if (!isValidPassword(password)) return res.status(400).send(invalidPasswordError);
    next();
};

exports.errorMiddleware = (err, _req, res, _next) => 
     res.status(err.status).send({ message: err.message });
