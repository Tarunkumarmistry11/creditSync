const express = require('express');
const cors = require('cors'); 
const connectDB = require('./Config/db'); 
const authRoutes = require('./Routes/authRoutes');
const reportRoutes = require('./Routes/reportRoutes');
const uploadRoutes = require('./Routes/uploadRoutes');
const { errorHandler } = require('./Middleware/errorMiddleware');

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use(cors()); 
app.use(express.json()); 
app.use('/api/auth', authRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/upload', uploadRoutes);

app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));