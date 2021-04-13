const validEmail = (req, res, next) => {
    const { email } = req.body;
    // disponivel em: https://cursos.alura.com.br/forum/topico-como-validar-email-e-senha-em-javascript-80469
    const regex = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;

    if (!email || email === '') {
        return res.status(400).send({ message: 'O campo "email" é obrigatório' });
    }
    if (!regex.test(email)) {
        return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    next();
};

module.exports = validEmail;