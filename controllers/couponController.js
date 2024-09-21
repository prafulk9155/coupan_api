const Coupon = require('../models/Coupon');

// Create a new coupon
exports.createCoupon = async (req, res) => {
    console.log(req.body.data)
    const { title,value, type, discount_min, discount_max } = req.body.data;

    if (!title ||!value || !type  || discount_min === undefined || discount_max === undefined) {
        return res.status(400).json({ error: true, message: "Title, type, discount_min, and discount_max are required." });
    }

    try {
        const newCoupon = new Coupon({ 
            title, 
            type, 
            discount_min, 
            discount_max, 
            value,
            added_by: req.user?.id || "0" // Assume user is authenticated using middleware
        });
        await newCoupon.save();
        res.status(201).json({ error: false, message: "Coupon added successfully", data: newCoupon });
    } catch (error) {
        console.error("Error while creating coupon:", error);
        res.status(500).json({ error: true, message: error.message });
    }
};

// Get all active coupons
exports.getCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find({ is_active: true });
        res.status(200).json({ error: false, data: coupons });
    } catch (error) {
        console.error("Error while fetching coupons:", error);
        res.status(500).json({ error: true, message: error.message });
    }
};

// Get Coupon by ID
exports.getCouponById = async (req, res) => {
    const { id } = req.body.data;

    try {
        const coupon = await Coupon.findById(id);
        if (!coupon) {
            return res.status(404).json({ error: true, message: "Coupon not found." });
        }
        res.status(200).json({ error: false, data: coupon });
    } catch (error) {
        console.error("Error while fetching coupon:", error);
        res.status(500).json({ error: true, message: error.message });
    }
};

// Update coupon details
exports.updateCoupon = async (req, res) => {
    const { id } = req.body.data; 
    const updateData = req.body.data; // Get the entire data to be updated

    try {
        delete updateData.id; // Remove id from updateData

        updateData.updated_on = Date.now();
        updateData.updated_by = updateData.updated_by || "0"; // Default if not provided

        const updatedCoupon = await Coupon.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true } // Return the updated document
        );

        if (!updatedCoupon) {
            return res.status(404).json({ error: true, message: "Coupon not found." });
        }

        res.status(200).json({ error: false, message: "Coupon updated successfully", data: updatedCoupon });
    } catch (error) {
        console.error("Error while updating coupon:", error);
        res.status(500).json({ error: true, message: error.message });
    }
};

// Delete (deactivate) a coupon 
exports.deleteCoupon = async (req, res) => {
    const { id } = req.body.data; // Get coupon ID from request body

    try {
        const updatedCoupon = await Coupon.findByIdAndUpdate(
            id,
            { is_active: false, updated_on: Date.now(), updated_by: req.user?.id || "0" },
            { new: true } // Return the updated document
        );

        if (!updatedCoupon) {
            return res.status(404).json({ error: true, message: "Coupon not found." });
        }

        res.status(200).json({ error: false, message: "Coupon deleted successfully" });
    } catch (error) {
        console.error("Error while deleting coupon:", error);
        res.status(500).json({ error: true, message: error.message });
    }
};
