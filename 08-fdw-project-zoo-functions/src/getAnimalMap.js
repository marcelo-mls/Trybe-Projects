const data = require('../data/zoo_data');

const animalMap = { NE: [], NW: [], SE: [], SW: [] };
const completeAnimalMap = { NE: [], NW: [], SE: [], SW: [] };

data.species.forEach((specie) => animalMap[specie.location].push(specie.name));

const getCompleteAnimalMap = () => {
  Object.keys(animalMap).forEach((keyLocation) => {
    data.species.forEach((specie) => {
      if (specie.location === keyLocation) {
        const residentsName = specie.residents.map((resident) => resident.name);
        const internalObject = { [specie.name]: residentsName };
        completeAnimalMap[keyLocation].push(internalObject);
      }
    });
  });
};

function getAnimalMap(options) {
  if (!options) { return animalMap; }
  if (Object.keys(options).length === 1 && options.includeNames) {
    getCompleteAnimalMap();
    return completeAnimalMap;
  }

  return animalMap;
}

module.exports = getAnimalMap;
