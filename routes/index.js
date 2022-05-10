const express = require('express');
const productsController = require('../controllers/productsController');
const salesController = require('../controllers/salesController');
const verifyBody = require('../middlewares/verifyBody');

const router = express.Router();

router.get('/products', productsController.getAll);
router.get('/products/:id', productsController.findProductById);
router.post('/products', verifyBody.nameValidate,
 verifyBody.quantityValidate, productsController.createProduct);
router.put('/products/:id', verifyBody.nameValidate,
 verifyBody.quantityValidate, productsController.updateProduct);
router.get('/sales', salesController.getAll);
router.get('/sales/:id', salesController.findSalesById);

module.exports = router;