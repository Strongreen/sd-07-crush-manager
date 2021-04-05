const fs = require('fs');

const generateToken = (withToken) => {
  let token = (Math.random() * withToken).toString().replace('.', '');
  if (token.length === 17) {
    token = token.split('');
    token.pop();
    token = token.join('');
  }
  return token;
};

module.exports = {
  async getCrushList(request, response) {
    try {
      const crushList = JSON.parse(await fs.promises.readFile('./crush.json', 'utf-8'));

      if (crushList.length === 0) {
        response.status(200).json(crushList);
      }

      response.json(crushList);
    } catch (e) {
      console.log(e);
    }
  },
  async getCrushById(request, response) {
    try {
      const { id } = request.params;
      const crushList = JSON.parse(await fs.promises.readFile('./crush.json', 'utf-8'));
      const crush = crushList.find((curr) => curr.id === parseInt(id, 10));

      const message = { message: 'Crush não encontrado' };

      if (crush === undefined) {
        response.status(404).json(message);
      }

      response.json(crush);
    } catch (e) {
      console.log(e);
    }
  },
  async login(request, response) {
    try {
      const withToken = 10 ** 16;
      const token = generateToken(withToken);
      await fs.promises.writeFile('./token.txt', token);
      response.json({ token });
    } catch (e) {
      console.log(e);
    }
  },
};
