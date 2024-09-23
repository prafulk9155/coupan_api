const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../middlewares/upload'); // Your Multer setup

// Use the upload middleware for file upload handling
router.post('/add', upload.single('productImage'), productController.addProduct);

// Get all active products
router.post('/get', productController.getAllProduct);

// Get product by ID
router.get('/getDataById', productController.getProductById);

// Update product
router.put('/update', productController.updateProduct);

// Delete product
router.put('/delete', productController.deleteProduct);

// Export the router
module.exports = router;
