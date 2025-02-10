// Example in your reportRoutes.js
const express = require('express');
const router = express.Router();
const { getReports } = require('../Controllers/reportController');
const { protect } = require('../Middleware/authMiddleware');

router.get('/reports', protect, async (req, res) => {
    console.log("GET /api/reports/reports: Request received");
    try {
        console.log("GET /api/reports/reports: User authenticated:", req.user); // Log user info
        const reports = await getReports(req, res); // Call the controller
        console.log("GET /api/reports/reports: Reports retrieved successfully");

    } catch (error) {
        console.error("GET /api/reports/reports: Error retrieving reports:", error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;