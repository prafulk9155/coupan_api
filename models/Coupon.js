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
        unique: true 
    },
    type: { 
        type: String, 
        required: true // Type (e.g., percentage or amount)
    },
    original_price: { 
        type: Number, 
        required: true // Original price of the item
    },
    current_price: { 
        type: Number, 
        required: true // Current price after discount
    },
    discount_percentage: { 
        type: Number, 
        required: true // Discount percentage calculated
    },
    expiry_date: { 
        type: Date, 
        required: true // Date until the coupon is valid
    },
    image: { 
        type: String, 
        required: true // URL/image path of the coupon image
    },
    link: { 
        type: String, 
        required: true // URL/image path of the coupon image
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
    },
    is_active: { type: Boolean, default: true },
    multiple_type: { type: Boolean, default: false }, 
    desc: { 
        type: String, 
        default:null
      
    },     

});

module.exports = mongoose.model('Coupon', couponSchema);
