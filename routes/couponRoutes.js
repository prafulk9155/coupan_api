const express = require('express');
const router = express.Router();
const couponController = require('../controllers/couponController');

// Add Metadata
router.post('/add', couponController.createCoupon);

// Get all active Metadata
router.post('/get', couponController.getCoupons);

// Get Metadata by ID
router.get('/getDataById', couponController.getCouponById);

// Update Metadata to inactive
router.put('/update', couponController.updateCoupon);
router.put('/delete', couponController.deleteCoupon);

// Export the router
module.exports = router;
