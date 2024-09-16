const Coupon = require('../models/Coupon');

// Create a new coupon
exports.createCoupon = async (req, res) => {
    const { code, discount } = req.body;

    try {
        const newCoupon = new Coupon({ 
            code, 
            discount, 
            createdByAdmin: req.user.id // Assume user is authenticated using middleware
        });
        await newCoupon.save();
        res.status(201).json(newCoupon);
    } catch (error) {
        res.status(500).json({ error: 'Error while creating coupon' });
    }
};

// Get all coupons
exports.getCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find();
        res.status(200).json(coupons);
    } catch (error) {
        res.status(500).json({ error: 'Error while fetching coupons' });
    }
};

// Apply a coupon
exports.applyCoupon = async (req, res) => {
    const { code } = req.body;

    try {
        const coupon = await Coupon.findOne({ code });
        if (!coupon || !coupon.isActive) {
            return res.status(400).json({ error: 'Invalid or inactive coupon' });
        }
        res.status(200).json({ message: 'Coupon applied successfully', discount: coupon.discount });
    } catch (error) {
        res.status(500).json({ error: 'Error while applying coupon' });
    }
};

// Delete a coupon by ID
exports.deleteCoupon = async (req, res) => {
    const { id } = req.params;

    try {
        await Coupon.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error while deleting coupon' });
    }
};

// Make sure to import User model

// Your existing functions go here (createCoupon, getCoupons, applyCoupon, etc.)

// Favorite a coupon for a user
exports.favoriteCoupon = async (req, res) => {
    const { couponId } = req.body; // The ID of the coupon to favorite

    try {
        // Check if the coupon exists
        const coupon = await Coupon.findById(couponId);
        if (!coupon) {
            return res.status(404).json({ error: 'Coupon not found' });
        }

        // Update user to add the coupon ID to their favorites
        const user = await User.findById(req.user.id); // req.user comes from authentication middleware
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Add to favorites array if not already present
        if (!user.favorites.includes(couponId)) {
            user.favorites.push(couponId);
            await user.save(); // Save updated user
        }

        res.status(200).json({ message: 'Coupon favorited successfully', favorites: user.favorites });
    } catch (error) {
        res.status(500).json({ error: 'Error while favoriting coupon' });
    }
};


// const Coupon = require('../models/Coupon');
const User = require('../models/User'); 