const express = require('express');
// const connection = require('../models/connection');

const salesController = require('../controllers/sales.controller');

const router = express.Router();

router.use(express.json());

router.get('/', salesController.getAllSales);
router.get('/:id', salesController.getSalesById);
router.post('/', salesController.insertNewSales);

module.exports = router;
