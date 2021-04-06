const passwordLength = (req, res, next) => {
    const { password } = req.body;
    const passwordStr = password.toString();
    const isValid = passwordStr.length > 6;
    if (!isValid) {
        return res.status(400).send({
            message: 'A "senha" deve ter pelo menos 6 caracteres',

        });
    }

    next();
};

module.exports = passwordLength;