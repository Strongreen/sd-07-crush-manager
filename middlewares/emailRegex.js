const emailRegex = (req, res, next) => {
    const { email } = req.body;
    if (!/\S+@\S+\.\S+/.test(email)) {
 return res.status(400).send({
        message: 'O "email" deve ter o formato "email@email.com"',
    }); 
} 
    next();
};

module.exports = emailRegex;