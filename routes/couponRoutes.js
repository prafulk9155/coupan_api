const express = require('express');
const {
    createCoupon,
    getCoupons,
    applyCoupon,
    favoriteCoupon, // Assuming you have an action to save a favorite
    deleteCoupon
} = require('../controllers/couponController');
const { authenticate } = require('../middlewares/authMiddleware'); // Authentication middleware
const router = express.Router();

// Create a new coupon (requires admin access)
router.post('/', authenticate, createCoupon); // Create coupon

// Get all coupons
router.get('/', getCoupons); // Retrieve all coupons

// Apply a coupon (does NOT require token)
router.post('/apply', applyCoupon); // Apply a coupon

// Favorite a coupon (requires token)
router.post('/favorite', authenticate, favoriteCoupon); // Save coupon as favorite

// Delete a coupon by ID (requires admin access)
router.delete('/:id', authenticate, deleteCoupon); // Delete coupon

module.exports = router;
