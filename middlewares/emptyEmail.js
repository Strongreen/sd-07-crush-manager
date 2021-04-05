const emptyEmail = (req, res, next) => {
    const { email } = req.body;
    if (email.length === 0 || !email) {
        return res.status(400).send({
            message: 'O campo "email" é obrigatório',
        });
    }
    next();
};

module.exports = emptyEmail;