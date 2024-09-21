// server.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db'); // Assuming you have set up a connectDB function to connect to MongoDB
const userRoutes = require('./routes/userRoutes'); // Import your routes
const couponRoutes = require('./routes/couponRoutes'); 
const { errorHandler } = require('./middlewares/errorMiddleware'); // Import error handling middleware
const productRoutes = require('./routes/productRoutes');
const metadataRoutes = require('./routes/metadataRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to Database
connectDB();

// Main API Confirmation Route
app.get('/', (req, res) => {

  console.log("main api")
  res.status(200).json({ error: false, message: "Coupon main api Running successfully" });
});

// Terms and Conditions Route
app.get('/tnc', (req, res) => {
  console.log("tnc")
  const termsAndConditions = `
    Terms and Conditions:
    
    1. This is a sample term and condition.
    2. All users must comply with the rules and regulations.
    3. Violations may result in suspension or termination.
    4. This service is provided as-is without warranties of any kind.
    
    Please read them carefully before using our services.
  `;

  res.status(200).json({ error: false, message: "Coupon API Running successfully...", terms: termsAndConditions });
});

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Vercel' });
});


// API Confirmation Route
app.get('/api', (req, res) => {
  res.status(200).json({ error: false, message: "Coupon Api Running successfully..." });
});

// Define Other Routes
app.use('/api/users', userRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/products', productRoutes);
app.use('/api/metadata', metadataRoutes);

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
