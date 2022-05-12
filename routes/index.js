const express = require('express');
const productsController = require('../controllers/productsController');
const salesController = require('../controllers/salesController');
const verifyBody = require('../middlewares/verifyBody');

const router = express.Router();
// Products
router.get('/products', productsController.getAll);
router.get('/products/:id', productsController.findProductById);
router.post('/products', verifyBody.nameValidate,
 verifyBody.quantityValidate, productsController.createProduct);
router.put('/products/:id', verifyBody.nameValidate,
 verifyBody.quantityValidate, productsController.updateProduct);
router.delete('/products/:id', productsController.deleteProduct);
// Sales
router.get('/sales', salesController.getAll);
router.get('/sales/:id', salesController.findSalesById);
router.post('/sales', salesController.addSales);
router.put('/sales/:id', salesController.updateSales);

module.exports = router;