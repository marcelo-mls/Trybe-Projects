const data = require('../data/zoo_data');

function countAnimals(animal) {
  if (!animal) {
    const totalDeAnimais = {};
    data.species.forEach((specie) => {
      totalDeAnimais[specie.name] = specie.residents.length;
    });
    return totalDeAnimais;
  }

  const animaisDaEspecie = data.species.find((specie) => specie.name === animal.specie).residents;

  if (!animal.sex) {
    return animaisDaEspecie.length;
  }

  return animaisDaEspecie.filter((animalDaEspecie) => animalDaEspecie.sex === animal.sex).length;
}

// console.log(countAnimals({ specie: 'lions' }));
// console.log(countAnimals({ specie: 'giraffes', sex: 'female' }));

module.exports = countAnimals;
