const validatePasswordMiddleware = (req, res, next) => {
    const { password } = req.body;    
    if (password === '' || password === undefined) {
        return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    }
    
    if (password.toString().length < 6) {
        return res.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
    }
    next();    
};

module.exports = validatePasswordMiddleware;