const express = require('express');
const router = express.Router();
const { postToTwitter } = require('../controllers/socialController');

// Post tweet route using Twitter API v2
router.post('/tweet', postToTwitter);

module.exports = router;