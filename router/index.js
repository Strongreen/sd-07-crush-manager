const express = require('express');
const fs = require('fs');
const rescue = require('express-rescue');
const middleware = require('../middleware');
const util = require('../util');

const router = express.Router();

router.get('/crush', rescue(async (req, res) => {
    const file = JSON.parse(await fs.promises.readFile('./crush.json', 'utf8'));
    res.status(200).send(file);
}));

router.get('/crush/search', middleware.tokenMiddleware);

router.get('/crush/search', rescue(async (req, res) => {
    res.status(200).send(await util.searchFunction(req.query));
}));

router.get('/crush/:id', rescue(async (req, res) => {
    const { id } = req.params;
    const file = JSON.parse(await fs.promises.readFile('./crush.json', 'utf8'));
    const crushExists = file.some((crush) => crush.id === Number(id));

    if (crushExists) return res.status(200).send(file.find((crush) => crush.id === Number(id)));

    return res.status(404).send({ message: 'Crush não encontrado' });
}));

router.post('/login', middleware.emailMiddleware);
router.post('/login', middleware.passwordMiddleware);

router.post('/login', (req, res) => {
    res.status(200).send({ token: util.generateToken() });
});

router.post('/crush', middleware.tokenMiddleware);
router.post('/crush', middleware.nameMiddleware);
router.post('/crush', middleware.ageMiddleware);
router.post('/crush', middleware.dateMiddleware);
router.post('/crush', middleware.dateObjectMiddleware);
router.post('/crush', middleware.dateAttributeMiddleware);

router.post('/crush', rescue(async (req, res) => {
    res.status(201).send(await util.createFunction(req.body));
}));

router.put('/crush/:id1', middleware.tokenMiddleware);
router.put('/crush/:id2', middleware.nameMiddleware);
router.put('/crush/:id3', middleware.ageMiddleware);
router.put('/crush/:id4', middleware.dateMiddleware);
router.put('/crush/:id5', middleware.dateObjectMiddleware);
router.put('/crush/:id6', middleware.dateAttributeMiddleware);

router.put('/crush/:id', rescue(async (req, res) => {
    res.status(200).send(await util.updateFunction(req.params, req.body));
}));

router.delete('/crush/:id1', middleware.tokenMiddleware);

router.delete('/crush/:ids', rescue(async (req, res) => {
    res.status(200).send(await util.deleteFunction(req.params));
}));

router.get('*', middleware.pageNotFoundMiddleware);
router.post('*', middleware.pageNotFoundMiddleware);
router.put('*', middleware.pageNotFoundMiddleware);
router.delete('*', middleware.pageNotFoundMiddleware);

router.use(middleware.errorMiddleware);

module.exports = router;
