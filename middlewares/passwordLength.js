const passwordLength = (req, res, next) => {
    const { password } = req.body;
    if (password.length < 6) {
        return res.status(400).send({
            message: 'O "password" ter pelo menos 6 caracteres',

        });
    }

    next();
};

module.exports = passwordLength;