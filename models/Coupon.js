const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true }, // Coupon code
    discount: { type: Number, required: true }, // Discount percentage or amount
    isActive: { type: Boolean, default: true }, // Status of the coupon
    createdByAdmin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the user who created it
    added_on: { type: Date, default: Date.now } // Timestamp for when the coupon was added
});

module.exports = mongoose.model('Coupon', couponSchema);
