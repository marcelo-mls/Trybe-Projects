const data = require('../data/zoo_data');

function getAnimalsOlderThan(animal, age) {
  const result = data.species.find((specie) => specie.name === animal)
    .residents.every((resident) => resident.age >= age);

  return result;
}

module.exports = getAnimalsOlderThan;
