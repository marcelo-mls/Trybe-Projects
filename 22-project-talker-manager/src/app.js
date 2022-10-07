// Importações
const express = require('express');
const bodyParser = require('body-parser');
const talkerRoute = require('./routes/talkers');
const loginRoute = require('./routes/login');

// Configurações
const app = express();

app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Roteamento
app.use('/talker', talkerRoute);
app.use('/login', loginRoute);

// Exportação
module.exports = app;
