const express = require('express');
const productsController = require('../controllers/productsController');
const salesController = require('../controllers/salesController');

const router = express.Router();

router.get('/products', productsController.getAll);
router.get('/products/:id', productsController.findProductById);
router.post('/products', productsController.createProduct);
router.get('/sales', salesController.getAll);
router.get('/sales/:id', salesController.findSalesById);

module.exports = router;