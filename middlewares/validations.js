const validationMiddleware = (req, res, next) => {
    const { email, password } = req.body;
    const passwordToString = password.toString();
    const emailTest = (/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email);

    if (!email) {
 res.status(400).send({ message: 'O campo "email" é obrigatório' });
    } else if (!emailTest) {
 res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"',
        });
    } else if (!password) {
        res.status(400).send({ message: 'O campo "password" é obrigatório',
        });
    } else if (passwordToString.length < 6) {
 res.status(400).send({
            message: 'O "password" deve ter pelo menos 6 caracteres',
        });
    } 
    next();
};

module.exports = validationMiddleware;
