const express = require('express');
const fs = require('fs');
const { validateToken } = require('../middlewares');

const router = express.Router();

router.get('/', validateToken, async (req, res, next) => {
    try {
        const dataSearch = await fs.promises.readFile('./crush.json', 'utf-8');
        const result = JSON.parse(dataSearch).filter((crush) => crush.name.includes(req.query.q));
        return res.json(result).status(200);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = router;
