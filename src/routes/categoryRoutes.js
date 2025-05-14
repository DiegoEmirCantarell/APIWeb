const express = require('express');
const categoryController = require('../controllers/categoryController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

// Public routes
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategory);

// Protected routes (require authentication)
router.use(authMiddleware.protect);

// Only admin/seller can perform these actions
router.use(authMiddleware.restrictTo('seller'));
router.post('/', categoryController.createCategory);
router.patch('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router; 