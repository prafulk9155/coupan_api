const express = require('express');
const router = express.Router();
const metadataController = require('../controllers/metadataController');
const metadataMiddleware = require('../middlewares/metadataMiddleware'); // Import the middleware

// Use the logging middleware for all routes
router.use(metadataMiddleware);

// Add Metadata
router.post('/add', metadataController.addMetadata);

// Get all active Metadata
router.post('/get', metadataController.getAllMetadata);

// Get Metadata by ID
router.get('/getDataById', metadataController.getMetadataById);

// Update Metadata to inactive
router.put('/update', metadataController.updateMetadata);
router.put('/delete', metadataController.deleteMetadata);

// Export the router
module.exports = router;
