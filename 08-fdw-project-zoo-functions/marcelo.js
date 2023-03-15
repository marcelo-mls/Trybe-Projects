// const { species } = require('./data/zoo_data');
// const data = require('./data/zoo_data');

// const animalMap = { NE: [], NW: [], SE: [], SW: [] };
// const completeAnimalMap = { NE: [], NW: [], SE: [], SW: [] };

// species.forEach((specie) => animalMap[specie.location].push(specie.name));

// const getCompleteAnimalMap = (sex) => {
//   Object.keys(animalMap).forEach((keyLocation) => {
//     data.species.forEach((specie) => {
//       if (specie.location === keyLocation) {
//         const residentsName = specie.residents.map((resident) => resident.name);
//         const internalObject = { [specie.name]: residentsName };
//         completeAnimalMap[keyLocation].push(internalObject);
//       }
//     });
//   });
// };

// getCompleteAnimalMap();

// console.log(completeAnimalMap);
// console.log(completeAnimalMap.NE);
