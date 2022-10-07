// Importações
const express = require('express');
const setToken = require('../utils/token');
const { emailValidator, passwordValidator } = require('../middlewares/loginValidators');

// Configurações
const router = express.Router();

const HTTP_OK_STATUS = 200;

router.use(express.json());

// Rotas
router.post('/', emailValidator, passwordValidator,
  async (req, res) => {
    const token = setToken(16);
    res.status(HTTP_OK_STATUS).send({ token });
});

// Exportação
module.exports = router;