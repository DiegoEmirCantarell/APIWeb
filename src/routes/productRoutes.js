const express = require('express');
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

// Public routes
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProduct);

// Protected routes (require authentication)
router.use(authMiddleware.protect);

// Only sellers can create products
router.post('/', authMiddleware.restrictTo('seller'), productController.createProduct);

// Update and delete routes check ownership in the controller
router.patch('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router; 