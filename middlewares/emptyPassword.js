const emptyPassword = (req, res, next) => {
    const { password } = req.body;
    if (password.length === 0 || !password) {
        return res.status(400).send({
            message: 'O campo "password" é obrigatório',

        });
    }

    next();
};

module.exports = emptyPassword;