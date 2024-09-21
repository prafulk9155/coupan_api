const express = require("express");
const router = express.Router();
const couponController = require("../controllers/couponController");
const couponMiddleware = require("../middlewares/couponMiddleware"); // Import the middleware

// Use the logging middleware for all routes
router.use(couponMiddleware);

// Add Metadata
router.post("/add", couponController.createCoupon);

// Get all active Metadata
router.post("/get", couponController.getCoupons);

// Get Metadata by ID
router.get("/getDataById", couponController.getCouponById);

// Update Metadata to inactive
router.put("/update", couponController.updateCoupon);

// Delete Metadata
router.put("/delete", couponController.deleteCoupon);

// Export the router
module.exports = router;
