// routes/couponRoutes.js
const express = require('express');
const { createCoupon } = require('../controllers/couponController');
const { authenticate } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authenticate, createCoupon); // Admin creation of coupon
// Additional routes for apply, get coupons go here...

module.exports = router;
