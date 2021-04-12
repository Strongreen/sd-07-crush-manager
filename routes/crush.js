const fs = require('fs').promises;
const path = require('path');
const express = require('express');
const middlewares = require('../middlewares');

const app = express();

const readCrushFile = async () => {
    const content = await fs.readFile(path.resolve(__dirname, '.', '../crush.json'));
    return JSON.parse(content.toString('utf-8'));
};

const readData = async () => {
    const data = JSON.parse(await fs.readFile(`${__dirname}/../crush.json`));
    return data;
};

app.get('/', async (_req, res) => {
    const result = await readCrushFile();
    res.status(200).send(result);
});

app.get('/:id', async (req, res) => {
    const result = await readCrushFile();
    const { id } = req.params;    
    const filteredCrush = result.find((crush) => crush.id === parseInt(id, 10));
    if (filteredCrush === undefined) {
        res.status(404).send({ message: 'Crush não encontrado' }); 
    }
    res.status(200).send(filteredCrush);    
});

app.post('/', 
    middlewares.tokenMiddleware,
    middlewares.validateNameMiddleware,
    middlewares.validateAgeMiddleware,
    middlewares.validateDateMiddleware,
    middlewares.validateRegexDateMiddleware,
    async (req, res) => {
    const allCrushes = await readData();
    const size = allCrushes.length;   
    const newCrush = {
        name: req.body.name,
        age: req.body.age,
        id: parseInt(`${size + 1}`, 10),
        date: { datedAt: req.body.date.datedAt,
            rate: req.body.date.rate,
        },
    };
    
   const CrushesUpdated = [...allCrushes, newCrush];
    try {
        await fs.writeFile(`${__dirname}/../crush.json`, JSON.stringify(CrushesUpdated));           
        res.status(201).json(newCrush);
    } catch (error) {
        throw new Error(error);        
    }    
});

module.exports = app;