const express = require("express");
const cors = require("cors");
const connectDB = require('./Config/db');
const dotenv = require('dotenv');
const uploadRoutes = require('./Routes/uploadRoutes');
const reportRoutes = require('./Routes/reportRoutes');

// If you have authRoutes, import it
const authRoutes = require('./Routes/authRoutes');  // Import the auth routes if needed

dotenv.config();
connectDB(); // Connect to MongoDB

const app = express();

app.use(cors());
app.use(express.json());

// Your routes
app.use('/api/upload', uploadRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/auth', authRoutes); // Authentication route (if you need it)

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
