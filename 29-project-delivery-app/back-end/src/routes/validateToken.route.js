const express = require('express');

const router = express.Router();

const validateTokenRoute = require('../controller/validateToken.controller');

router.post('/', validateTokenRoute.validate);

module.exports = router;