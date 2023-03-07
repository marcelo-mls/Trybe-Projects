const express = require('express');
const cors = require('cors');
const router = require('../routes/router');

const app = express();

app.use('/images', express.static('public'));

app.use(cors());

app.use(express.json());

app.use(router);

module.exports = app;
