const express = require('express');
const router = express.Router();
const { compareProducts } = require('../controllers/scrapingController');

router.get('/compare', compareProducts);

module.exports = router;