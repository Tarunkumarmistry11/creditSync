const multer = require('multer');
const fs = require('fs');
const CreditReport = require('../Models/creditReport');
const { parseXML } = require('../Utils/parseXML');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadXML = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const xmlData = req.file.buffer.toString();
    const parsedData = await parseXML(xmlData);

    const newReport = new CreditReport(parsedData);
    await newReport.save();

    res.status(201).json({ message: 'File processed successfully', data: newReport });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CommonJS syntax to export the middleware and function
const uploadMiddleware = upload.single('file');
module.exports = { uploadXML, uploadMiddleware };
