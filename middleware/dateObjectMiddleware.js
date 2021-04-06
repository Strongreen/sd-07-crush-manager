const dateObjectMiddleware = (req, res, next) => {
    const { date } = req.body;
    const { datedAt, rate } = date;

    if (datedAt === undefined || rate === undefined) {
        return res.status(400)
        .send({ 
            message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
        });
    }

    next();
};

module.exports = dateObjectMiddleware;
