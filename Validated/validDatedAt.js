const NOTFOUND = 400;

function validDatedAt(datedAt, res) {
    const dateRegex = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
    if (!dateRegex.test(datedAt)) {
       return res.status(NOTFOUND)
                 .send({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
    } 
}

module.exports = { validDatedAt };
