const express = require('express');
const controller = require('../controllers/category.controller');
const middlewares = require('../utils/Middlewares');

const router = express.Router();

router.post('/',
  middlewares.tokenValidation,
  middlewares.categoryNameValidation,
  controller.insertCategory);

router.get('/',
  middlewares.tokenValidation,
  controller.selectAllCategories);

module.exports = router;