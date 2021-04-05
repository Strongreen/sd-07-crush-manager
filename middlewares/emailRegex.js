const emailRegex = (req, res, next) => {
    const { email } = req.body;
    console.log(email, !/\S+@\S+\.\S+/.test(email))
    if (!/\S+@\S+\.\S+/.test(email)) {
 return res.status(400).send({
        message: 'O "email" deve ter o formato "email@email.com"',
    }); 
} 
    next();
};

module.exports = emailRegex;