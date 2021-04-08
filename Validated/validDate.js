const NOTFOUND = 400;

function validDate(date, res) {
    const message = 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios';
    const { datedAt, rate } = date;
    if (!date) {
        return res.status(NOTFOUND)
                  .send({ message });
    }
    if (!datedAt) {
        return res.status(NOTFOUND)
                  .send({ message });
    }
    if (!rate) {
        return res.status(NOTFOUND)
                  .send({ message });
    }
}

module.exports = { validDate };
