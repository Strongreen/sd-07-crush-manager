const fs = require('fs').promises;
const path = require('path');
const express = require('express');

const app = express();

const readCrushFile = async () => {
    const content = await fs.readFile(path.resolve(__dirname, '.', '../crush.json'));
    return JSON.parse(content.toString('utf-8'));
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

app.post('/', async (req, res) => {
    const result = await readCrushFile();
    const size = result.length;
    result[size] = {
        name: req.body.name,
        age: req.body.age,
        id: parseInt(`${size + 1}`, 10),
        date: { dateAt: req.body.datedAt,
            rate: req.body.rate,
        },
    };

    try {
        await fs.writeFile(path.resolve(__dirname, '.', '../crush.json', JSON.stringify(result)));
        res.status(201).send({ message: 'Salvo com sucesso' });
    } catch (error) {
        throw new Error(error);        
    }    
});

module.exports = app;