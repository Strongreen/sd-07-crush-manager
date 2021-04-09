function validDate(date) {
    const message = 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios';
    if (date === undefined || date.datedAt === undefined || date.rate === undefined) {
        throw new Error(message);
    }
}

module.exports = { validDate };
