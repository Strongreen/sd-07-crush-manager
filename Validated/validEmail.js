const NOTFOUND = 400;

function validEmail(email, res) {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email) return res.status(NOTFOUND).send({ message: 'O campo "email" é obrigatório' });
    if (!validRegex.test(email)) {
        return res.status(NOTFOUND)
                  .send({ message: 'O "email" deve ter o formato "email@email.com"' });
      } 
}

module.exports = { validEmail };
