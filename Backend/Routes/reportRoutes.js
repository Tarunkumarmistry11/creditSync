const express = require('express');
const router = express.Router();
const { getReports } = require('../Controllers/reportController');  

router.get('/reports', getReports);

module.exports = router;
