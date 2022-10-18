const express = require('express');
const productsController = require('../controllers/product.controller');

const router = express.Router();

router.use(express.json());

router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getProductsById);
router.post('/', productsController.insertNewProduct);
router.put('/:id', productsController.updateProduct);
router.delete('/:id', productsController.deleteProduct);

module.exports = router;
