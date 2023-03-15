// Lógica desenvolvida com ajuda de João E. S. Pacheco
function setLastId(readFile) {
  const lastId = readFile.map((talker) => talker.id)
    .sort((a, b) => b - a);

  return lastId[0] + 1;
}

module.exports = setLastId;