const express = require('express');
const { createProduct, getProducts,addCategory } = require('../controllers/productController'); // Import the relevant controller functions
const router = express.Router();

// Create a new product
router.post('/add-product', createProduct); // POST request to create a product
router.post('/add-category', addCategory);


// Get all products (or filter based on additional criteria if needed)
router.get('/', getProducts); // GET request to fetch all products

module.exports = router; // Export the router to be used in server.js
