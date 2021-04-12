const express = require('express');
const fs = require('fs');
const data = require('../crush.json');
const { validateToken, validateDate, validateAge, validateName } = require('../middlewares');

const router = express.Router();

router.get('/', (_req, res) => {
    if (data.length === 0) return res.status(200).json([]);

    return res.status(200).json(data);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    if (data[id - 1] === undefined) {
        return res.status(404).json({
        message: 'Crush não encontrado',
      });
}
    return res.status(200).send(data[id - 1]);
});

router.post('/', validateToken, validateDate, validateAge, validateName, async (req, res, next) => {
    const size = data.length;
    data[size] = {
        id: `${size + 1}`,
        name: req.body.name,
        age: req.body.age,
        date: req.body.date,
    };

    try {
        await fs.promises.writeFile(`${__dirname}/../crush.json`, JSON.stringify(data));
        return res.status(201).json(data[size]);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.put('/:id',
 validateToken,
 validateName,
 validateAge,
 validateDate,
  async (req, res, next) => {
    const { id } = req.params;
    const { name, age, date } = req.body;
    data[id - 1].name = name;
    data[id - 1].age = age;
    data[id - 1].date = date;

    try {
        await fs.promises.writeFile(`${__dirname}/../crush.json`, JSON.stringify(data));
        return res.status(200).json(data[id - 1]);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.delete('/:id', validateToken, async (req, res, next) => {
    const { id } = req.params;
    const index = id - 1;
    data.splice(index, 1);

    try {
        await fs.promises.writeFile(`${__dirname}/../crush.json`, JSON.stringify(data));
        return res.status(200).json({ message: 'Crush deletado com sucesso' });
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// router.get('/search', validateToken, async (req, res, next) => {
//     const { q } = req.query;
//     try {
//         const dataSearch = await fs.promises.readFile(`${__dirname}/../crush.json`);
//         const response = JSON.parse(dataSearch);
//         console.log(response);
//         const result = response.filter((crush) => crush.name.includes(q));
//         res.json(result).status(200);
//     } catch (error) {
//         console.log(error);
//         next(error);
//     }
// });

module.exports = router;