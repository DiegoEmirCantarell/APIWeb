const express = require('express');
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

// Public routes
router.get('/', productController.getAllProducts);
router.get('/seller/:sellerId', productController.getProductsBySeller);
router.get('/category/:categoryId', productController.getProductsByCategory);
router.get('/:id', productController.getProduct);

// Protected routes (require authentication)
router.use(authMiddleware.protect);

// Only sellers can create products
router.post('/', authMiddleware.restrictTo('seller'), productController.createProduct);

// Endpoint para reducir stock de múltiples productos
router.post('/updateStock', productController.reduceProductsStock);

// Update and delete routes check ownership in the controller
router.patch('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router; 