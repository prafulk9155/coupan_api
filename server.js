// server.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const couponRoutes = require('./routes/couponRoutes');
const { authenticate } = require('./middlewares/authMiddleware'); // Import authentication middleware
const { errorHandler } = require('./middlewares/errorMiddleware'); // Import error handling middleware
const productRoutes = require('./routes/productRoutes')

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

// Define Routes
app.use('/api/users', userRoutes);
app.use('/api/coupons', authenticate, couponRoutes); // Apply authentication to coupon routes
app.use('/api/products', productRoutes);

// Error handling middleware should be the last middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
