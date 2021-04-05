const validatePassword = (password) => /^\d{6,12}$/gm.test(password);

const checkPasswordMiddiware = (req, res, next) => {
    const { password } = req.body;
    if (!password || password === '') {
        res.status(400).send(
            {
                message: 'O campo "password" é obrigatório',
            },
        );
    } else
        if (!validatePassword(password)) {
            res.status(400).send(
                {
                    message: 'O "password" deve ter pelo menos 6 caracteres',
                },
            );
        } else {
            next();
        }
};

module.exports = checkPasswordMiddiware;
