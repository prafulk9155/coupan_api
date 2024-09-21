// models/Coupon.js
const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true, // Title of the coupon
    },
    value: { 
        type: String, 
        required: true,
        unique:true 
    },
    type: { 
        type: String, 
        required: true // Type (e.g., percentage or amount)
    },
    discount_min: { 
        type: Number, 
        required: true // Minimum discount value
    },
    discount_max: { 
        type: Number, 
        required: true // Maximum discount value
    },
    is_active: { 
        type: Boolean, 
        default: true // Status of the coupon
    },
    added_on: { 
        type: Date, 
        default: Date.now // Timestamp when the coupon was added 
    },
    added_by: { 
        type: String, 
        default: "0" // Added by user (default to "0")
    },
    updated_on: { 
        type: Date, 
        default: null // Last updated timestamp
    },
    updated_by: { 
        type: String, 
        default: "0" // Updated by user (default to "0")
    }
});

module.exports = mongoose.model('Coupon', couponSchema);
