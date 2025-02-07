const express = require('express');
const { uploadXML, uploadMiddleware } = require('../Controllers/uploadController');

const router = express.Router();
router.post('/upload', uploadMiddleware, uploadXML);

module.exports =  router;