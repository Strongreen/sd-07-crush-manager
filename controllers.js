const fs = require('fs');

const file = 'crush.json';

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
      const crushList = JSON.parse(await fs.promises.readFile(`./${file}`, 'utf-8'));

      if (crushList.length === 0) {
        return response.status(200).send(crushList);
      }

      return response.send(crushList);
    } catch (e) {
      console.log(e);
    }
  },
  async getCrushById(request, response) {
    try {
      const { id } = request.params;
      const crushList = JSON.parse(await fs.promises.readFile(`./${file}`, 'utf-8'));
      const crush = crushList.find((curr) => curr.id === parseInt(id, 10));

      if (crush === undefined) {
        return response.status(404).send({ message: 'Crush não encontrado' });
      }

      return response.send(crush);
    } catch (e) {
      console.log(e);
    }
  },
  async createCrush(request, response) {
    try {
      const crush = request.body;
      const crushList = JSON.parse(await fs.promises.readFile(`./${file}`, 'utf-8'));
      if (crushList.length === 0) crush.id = 1;
      else crush.id = crushList.length + 1;
      crushList.push(crush);
      await fs.promises.writeFile(`./${file}`, JSON.stringify(crushList));
      return response.status(201).send(crush);
    } catch (e) {
      console.log(e);
    }
  },
  async login(request, response) {
    try {
      const withToken = 10 ** 16;
      const token = generateToken(withToken);
      await fs.promises.writeFile('./token.txt', token);
      return response.send({ token });
    } catch (e) {
      console.log(e);
    }
  },
  async updateCrush(request, response) {
    const crush = request.body;
    const { id } = request.params;
    const crushList = JSON.parse(await fs.promises.readFile(`./${file}`, 'utf-8'));
    const crushListFiltered = crushList.filter((next) => next.id !== id);
    crush.id = parseInt(id, 10);
    await fs.promises.writeFile(`./${file}`, JSON.stringify([crushListFiltered, crush]));
    return response.status(200).send(crush);
  },
  async deleteCrush(request, response) {
    const { id } = request.params;
    const crushList = JSON.parse(await fs.promises.readFile(`./${file}`, 'utf-8'));
    const crushListFiltered = crushList.filter((next) => next.id !== id);
    await fs.promises.writeFile(`./${file}`, JSON.stringify(crushListFiltered));
    return response.status(200).send({ message: 'Crush deletado com sucesso' });
  },
  async searchCrush(request, response) {
    const { q } = request.query;
    const crushs = JSON.parse(await fs.promises.readFile(`./${file}`, 'utf-8'));

    if (q === undefined || q === '') {
      return response.status(200).json(crushs);
    }
    const searchArtist = crushs.filter((crush) => (crush.name).includes(q));

    response.status(200).json(searchArtist);
  },
};
