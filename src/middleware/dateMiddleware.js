const dateMiddleware = (req, res, next) => {
    const { date } = req.body;

    if (date === undefined) {
        return res.status(400)
        .send({ 
            message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
        });
    }

    next();
};

module.exports = dateMiddleware;
