const NOTFOUND = 400;

function validRate(rate, res) {
    const message = 'O campo "rate" deve ser um inteiro de 1 à 5';
    if (rate < 1 || rate > 5) {
        return res.status(NOTFOUND)
                  .send({ message });
    }
    if (typeof rate !== 'number') {
        return res.status(NOTFOUND)
                  .send({ message });
    }
}

module.exports = { validRate };
