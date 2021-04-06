const fs = require('fs');

const SUCCESS = 200;
const LOGINFAIL = 400;
const FOLDERPATH = './crush.json';
const { generateToken,
    validateEmail,
    validateFormatDate,
} = require('../functions');

async function readFile() {
    const crushs = await JSON.parse(fs.readFileSync(FOLDERPATH, 'utf-8'));
    return crushs;
}

function validatePassword(password) {
    if (password === undefined) return false;
    const convertPassword = password.toString();
    if (convertPassword.length >= 6 && convertPassword) {
        return true;
    }
    return false;
}

const validateUser = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Token não encontrado' });
    }
    if (authHeader.length !== 16) {
        return res.status(401).json({ message: 'Token inválido' });
    }
    next();
};

const searchCrush = async (req, res, next) => {
    const { q } = req.query;
    const crushs = await readFile();
    const filteredCrushByQuery = crushs.filter((crush) =>
        crush.name
            .toLowerCase()
            .includes(q.toLowerCase()));
    if (filteredCrushByQuery) {
        return res.status(200).json(filteredCrushByQuery);
    }
    next();
};

const login = async (req, res, next) => {
    const { password, email } = req.body;
    const isValidEmail = validateEmail(email);
    const isValidPassword = validatePassword(password);
    const tokenLength = 16;
    if (!email) {
        res.status(LOGINFAIL).json({ message: 'O campo "email" é obrigatório' });
    } else if (!isValidEmail) {
        res.status(LOGINFAIL).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    } else if (!password) {
        res.status(LOGINFAIL).json({ message: 'O campo "password" é obrigatório' });
    } else if (!isValidPassword) {
        res.status(LOGINFAIL).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
    } else {
        res.status(SUCCESS).json({ token: `${generateToken(tokenLength)}` });
    }
    next();
};

const validateName = (req, res, next) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    }
    if (name.length <= 2) {
        return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
    next();
};

const validateAge = (req, res, next) => {
    const { age } = req.body;
    if (!age) {
        return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    }
    if (age < 18) {
        return res.status(400).json({ message: 'O crush deve ser maior de idade' });
    }
    next();
};

const validateDate = (req, res, next) => {
    const { date } = req.body;

    if (!date || !date.datedAt || typeof (date.rate) !== 'number') {
        return res.status(400).json(
            { message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' },
        );
    }
    const isDateValid = validateFormatDate(date.datedAt);
    if (!isDateValid) {
        return res.status(400)
            .json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    next();
};

const validateRate = (req, res, next) => {
    const { date } = req.body;
    if (date.rate <= 0 || date.rate > 5) {
        return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    next();
};

const setCrush = async (req, res, next) => {
    const { name, age, date } = req.body;
    const crushs = await readFile();
    const postCrush = {
        name,
        age,
        id: crushs.length + 1,
        date,
    };
    crushs.push(postCrush);
    try {
        await fs.promises.writeFile(FOLDERPATH, JSON.stringify(crushs));
        res.status(201).json(postCrush);
    } catch (error) {
        throw new Error(error);
    }
    next();
};

const editCrush = async (req, res, next) => {
    const { id } = req.params;
    const { name, age, date } = req.body;
    const crushs = await readFile();
    const findCrushById = crushs.find((crush) => crush.id === Number(id));

    findCrushById.name = name;
    findCrushById.age = age;
    findCrushById.date = date;

    crushs.push(findCrushById);

    try {
        await fs.promises.writeFile(FOLDERPATH, JSON.stringify(crushs));
        res.status(200).json(findCrushById);
    } catch (error) {
        throw new Error(error);
    }
    next();
};

const deleteCrush = async (req, res, next) => {
    const { id } = req.params;
    const crushs = await readFile();
    const filteredCrushs = crushs.filter((crush) => crush.id !== Number(id));
    try {
        await fs.promises.writeFile(FOLDERPATH, JSON.stringify(filteredCrushs));
        res.status(200).send({ message: 'Crush deletado com sucesso' });
    } catch (error) {
        throw new Error(error);
    }
    next();
};

module.exports = {
    deleteCrush,
    editCrush,
    setCrush,
    validateRate,
    validateDate,
    validateAge,
    validateName,
    login,
    searchCrush,
    validateUser,
    readFile,
};
