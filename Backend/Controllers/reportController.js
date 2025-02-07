const CreditReport = require('../Models/creditReport');

const getReports = async (req, res) => {
  try {
    const reports = await CreditReport.find();
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getReports };