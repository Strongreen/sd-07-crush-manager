const validateDatedMiddleware = (req, res, next) => {
    const { date } = req.body;    
    if (date === undefined || date.datedAt === undefined || date.rate === undefined) {
        return res.status(400).json({ 
            message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios', 
        });
    }
    
    next();    
};

module.exports = validateDatedMiddleware;