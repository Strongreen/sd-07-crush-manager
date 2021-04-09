function validRate(rate) {
    const message = 'O campo "rate" deve ser um inteiro de 1 à 5';
    if (rate < 1 || rate > 5) {
        throw new Error(message);
    }
    if (typeof rate !== 'number') {
        throw new Error(message);
    }
}

module.exports = { validRate };
