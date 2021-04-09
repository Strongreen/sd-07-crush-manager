// solução encontrada em: https://stackoverflow.com/questions/8532406/create-a-random-token-in-javascript-based-on-user-details
const generateToken = (len) => {
const rand = () => Math.random(0).toString(36).substr(2);
const token = (rand() + rand() + rand() + rand()).substr(0, len);
return token;
};

generateToken(16);
