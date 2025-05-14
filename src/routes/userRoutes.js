const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

// Protected routes (require authentication)
router.use(authMiddleware.protect);

router.get('/me', userController.getMe);
router.patch('/updateMe', userController.updateMe);

module.exports = router; 