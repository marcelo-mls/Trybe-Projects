const express = require('express');
const controller = require('../controllers/user.controller');
const middlewares = require('../utils/Middlewares');

const router = express.Router();

router.post('/',
  middlewares.displayNameValidation,
  middlewares.emailValidation,
  middlewares.passwordValidation,
  controller.insertUser);

router.get('/',
  middlewares.tokenValidation,
  controller.selectAllUsers);

router.get('/:id',
  middlewares.tokenValidation,
  controller.selectUserById);

module.exports = router;