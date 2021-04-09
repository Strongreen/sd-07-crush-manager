// const { getId } = require('./getId');

function editedCrush(body, id) {
    const { name, age, date } = body;
    // const { crushes } = await getId();
    try {
      const crush = {
        id,
        name,
        age,
        date,
      };
        // crushes[id - 1] = crush;
    return crush;
    } catch (error) {
      throw new Error('ID não encontrado');
    }
  }

module.exports = { editedCrush };
