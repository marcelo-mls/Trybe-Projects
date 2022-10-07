const fs = require('fs').promises;
const path = require('path');
const setLastId = require('./idGenerator');

const DATA_PATH = path.resolve(__dirname, '../talker.json');

async function readTalkerFile() {
  try {
    const response = await fs.readFile(DATA_PATH, 'utf-8');
    const data = JSON.parse(response);
    return data;
  } catch (error) {
    console.log(`Erro de Leitura: ${error}`);
  }
}

async function readTalkerFileById(id) {
  try {
    const response = await readTalkerFile();
    const data = response.find((talker) => talker.id === Number(id));
    return data;
  } catch (error) {
    console.log(`Erro de Leitura: ${error}`);
  }
}

async function writeNewTalker(talker) {
  try {
    const response = await readTalkerFile();
    const newTalker = { ...talker, id: setLastId(response) };

    const updatedResponse = JSON.stringify([...response, newTalker]);
    await fs.writeFile(DATA_PATH, updatedResponse);
    return newTalker;
  } catch (error) {
    console.log(`Erro na Escrita: ${error}`);
  }
}

async function updateTalkerById(id, body) {
  // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
  try {
    const response = await readTalkerFile();
    const index = response.findIndex((talker) => talker.id === Number(id));

    response[index] = { id: Number(id), ...body };

    const updatedTalker = response[index];

    await fs.writeFile(DATA_PATH, JSON.stringify(response));

    return updatedTalker;
  } catch (error) {
    console.log(`Erro na Escrita ao Atualizar: ${error}`);
  }
}

async function deleteTalkerById(id) {
  try {
    const response = await readTalkerFile();
    const remainingTalkers = response.filter((talker) => talker.id !== Number(id));
    
    await fs.writeFile(DATA_PATH, JSON.stringify(remainingTalkers));
  } catch (error) {
    console.log(`Erro na Escrita ao Deletar: ${error}`);
  }
}

async function searchTalker(query) {
  try {
    const response = await readTalkerFile();
    if (!query) {
      return response;
    }
    const remainingTalkers = response.filter((talker) => talker.name.includes(query));
    return remainingTalkers;
  } catch (error) {
    console.log(`Erro na Leitura da query: ${error}`);
  }
}

module.exports = {
  readTalkerFile,
  readTalkerFileById,
  writeNewTalker,
  updateTalkerById,
  deleteTalkerById,
  searchTalker,
};
