const Coupon = require('../models/Coupon');

// Create a new coupon
exports.createCoupon = async (req, res) => {
    const { title, value, type, original_price, current_price, expiry_date,image,link,desc,multiple_type } = req.body.data;

    // Basic validation for required fields
    if (!title || !value || !type || original_price === undefined || current_price === undefined || !expiry_date ) {
        return res.status(400).json({ error: true, message: "Title, value, type, original_price, current_price, expiry_date and image are required." });
    }

    try {
        // Calculate discount percentage
        const discount_percentage = ((original_price - current_price) / original_price) * 100;

        // Prepare new coupon
        const newCoupon = new Coupon({ 
            title, 
            value,
            type,
            original_price,
            current_price,
            link,
            discount_percentage:discount_percentage,
            expiry_date: new Date(expiry_date),
            image: image, // Assuming you save the image path here
            added_by: req.user?.id || "0",
            multiple_type,
            desc // Assume user is authenticated
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
        const { type, expiry_date } = req.query; // Get query parameters from the request

        // Build the query object
        const query = { is_active: true };

        // If a type is provided, add it to the query
        if (type) {
            query.type = type;
        }

        // If an expiry_date is provided, filter for coupons that are still valid
        if (expiry_date) {
            query.expiry_date = { $gte: new Date() }; // Ensure the expiry date is greater or equal to current date
        }

        // Fetch coupons based on the query
        const coupons = await Coupon.find(query);

        res.status(200).json({ error: false, data: coupons });
    } catch (error) {
        console.error("Error while fetching coupons:", error);
        res.status(500).json({ error: true, message: error.message });
    }
};

// Get Coupon by ID
// Controller: Get Coupon by ID
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
