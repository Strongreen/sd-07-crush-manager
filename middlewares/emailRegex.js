const emailRegex = (req, res, next) => {
    const { email } = req.body;
    if (!email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i)) {
 return res.status(400).send({
        message: 'O "email" deve ter o formato "email@email.com"',
    }); 
} 
    next();
};

module.exports = emailRegex;