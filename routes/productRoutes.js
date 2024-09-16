const express = require('express');
const { createProduct, getProducts } = require('../controllers/productController'); // Import the relevant controller functions
const router = express.Router();

// Create a new product
router.post('/', createProduct); // POST request to create a product

// Get all products (or filter based on additional criteria if needed)
router.get('/', getProducts); // GET request to fetch all products

module.exports = router; // Export the router to be used in server.js
