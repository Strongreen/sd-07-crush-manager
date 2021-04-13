const tokenDateObr = (req, res, next) => {
    const { date } = req.body;
    if (date === undefined) {
        return res
          .status(400)
       .send({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
      }
    if (!date.datedAt || date.rate === 'undefined') {
        res.status(400).send({
            message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
        });
    }   
    const dateRegex = /([0-2][0-9]|3[0-1])\/(0[0-9]|1[0-2])\/[0-9]{4}/;
    if (!dateRegex.test(date.datedAt)) {
        res.status(400).send({
            message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"',
        });
    }
    next();
    };
    
    module.exports = tokenDateObr;