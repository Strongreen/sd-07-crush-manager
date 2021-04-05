const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.com$/.test(email);

const checkEmailMiddiware = (req, res, next) => {
    const { email } = req.body;
    
        if (!email || email === '') {
            res.status(400).send(
                {
                    message: 'O campo "email" é obrigatório',
                },
            );
        } else
            if (!validateEmail(email)) {
                res.status(400).send(
                    {
                        message: 'O "email" deve ter o formato "email@email.com"',
                    },
                );
            } else {
                next();
            }
};

module.exports = checkEmailMiddiware;