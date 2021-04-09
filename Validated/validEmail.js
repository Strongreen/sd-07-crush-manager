function validEmail(email) {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const messagem = 'O "email" deve ter o formato "email@email.com"';
    const message = 'O campo "email" é obrigatório';
    if (!email) {
        throw new Error(message);
    }
    if (!validRegex.test(email)) {
        throw new Error(messagem);
    }
}

module.exports = { validEmail };
