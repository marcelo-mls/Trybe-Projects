const express = require('express');
const authController = require('../controllers/auth.controllers');
const middlewares = require('../utils/Middlewares');

const router = express.Router();

router.post('/', middlewares.loginValidation, authController.login);

module.exports = router;