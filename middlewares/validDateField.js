const validDateFieldMiddleware = (req, res, next) => {
const { datedAt, rate } = req.body.date;
const { date } = req.body;

if (typeof date === 'undefined' || !datedAt || !rate) {
    res.status(400).send({
        message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    });
}
next();
};

module.exports = validDateFieldMiddleware;