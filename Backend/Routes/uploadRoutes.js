const express = require('express');
const { uploadXML, uploadMiddleware } = require('../Controllers/uploadController');
const { protect } = require('../Middleware/authMiddleware'); // Import protect

const router = express.Router();
router.post('/upload', protect, uploadMiddleware, uploadXML); // Apply protect

module.exports = router;