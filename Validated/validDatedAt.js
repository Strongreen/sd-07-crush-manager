function validDatedAt(datedAt) {
    const dateRegex = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
    const message = 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"';
    if (!dateRegex.test(datedAt)) {
        throw new Error(message);            
    } 
}

module.exports = { validDatedAt };
