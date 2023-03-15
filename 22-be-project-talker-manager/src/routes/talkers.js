// Importações
const express = require('express');

const { readTalkerFile,
  readTalkerFileById,
  writeNewTalker,
  updateTalkerById,
  deleteTalkerById,
  searchTalker,
} = require('../utils/fsUtils.js');

const { tokenValidator,
  nameValidator,
  ageValidator,
  talkValidator,
  watchedAtValidator,
  rateValidator,
} = require('../middlewares/talkersValidators');

// Configurações
const router = express.Router();

const HTTP_OK_STATUS = 200;
const HTTP_CREATED = 201;
const HTTP_NO_CONTENT = 204;
const HTTP_NOT_FOUND = 404;

router.use(express.json());

// Rotas
router.get('/search', tokenValidator, async (req, res) => {
  const { q } = req.query;
  const response = await searchTalker(q);
  res.status(HTTP_OK_STATUS).json(response);
});

router.get('/', async (req, res) => {
  const talkers = await readTalkerFile();
  res.status(HTTP_OK_STATUS).send(talkers);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await readTalkerFileById(id);
  if (talker) {
    return res.status(HTTP_OK_STATUS).send(talker);
  }
  res.status(HTTP_NOT_FOUND).send({ message: 'Pessoa palestrante não encontrada' });
});

router.post('/',
  tokenValidator,
  nameValidator,
  ageValidator,
  talkValidator,
  watchedAtValidator,
  rateValidator,
  async (req, res) => {
    const newTalker = await writeNewTalker(req.body);
    res.status(HTTP_CREATED).json(newTalker);
});

router.put('/:id',
  tokenValidator,
  nameValidator,
  ageValidator,
  talkValidator,
  watchedAtValidator,
  rateValidator,
  async (req, res) => {
    const { id } = req.params;
    const newTalker = await updateTalkerById(id, req.body);
    res.status(HTTP_OK_STATUS).json(newTalker);
});

router.delete('/:id', tokenValidator, async (req, res) => {
    const { id } = req.params;
    await deleteTalkerById(id);
    res.status(HTTP_NO_CONTENT).end();
});

// Exportação
module.exports = router;
