const express = require('express');

const router = express.Router();

const userController = require('../controller/user.controller');

router.get('/sellers', userController.getSellers);

module.exports = router;
