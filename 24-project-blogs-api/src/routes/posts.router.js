const express = require('express');
const controller = require('../controllers/posts.controller');
const middlewares = require('../utils/Middlewares');

const router = express.Router();

router.get('/', middlewares.tokenValidation, controller.selectAllPosts);

module.exports = router;