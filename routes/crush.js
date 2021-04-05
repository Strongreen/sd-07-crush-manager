const express = require('express');
const middlewares = require('../middlewares')
const data = require('../crush.json');

const router = express.Router();


router.post('/',middlewares.checkToken,middlewares.checkName,middlewares.checkAge,middlewares.checkDate,middlewares.registerCrush)
   
   


router.get('/:id', (req, res) => {
    const { id } = req.params;

    const dataFind = data.find((crush) => crush.id === Number(id));
    if (dataFind) {
        res.send(
            dataFind,
        );
    } else {
        res.status(404).send({
            message: 'Crush não encontrado',
        });
    }
});

module.exports = router;