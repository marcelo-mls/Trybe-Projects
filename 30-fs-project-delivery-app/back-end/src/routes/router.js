const express = require('express');

const jwtUtils = require('../utils/jwt.utils');
const loginRoute = require('./login.route');
const productsRoute = require('./products.route');
const registerRoute = require('./register.route');
const salesRoute = require('./sales.route');
const userRoute = require('./user.route');
const adminRoute = require('./admin.route');

const router = express.Router();

router.use('/login', loginRoute);
router.use('/products', productsRoute);
router.use('/register', registerRoute);
router.use('/users', userRoute);
router.use('/sales', salesRoute);
router.use('/admin', jwtUtils.validateTokenMiddleware, adminRoute);

module.exports = router;
