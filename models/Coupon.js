const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true }, // Coupon code
    discount: { type: Number, required: true },
    type:{  type: String, required: true } ,// Discount percentage or amount
    isActive: { type: Boolean, default: true }, // Status of the coupon
    createdByAdmin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the user who created it
    added_on: { type: Date, default: Date.now },// Timestamp of when the category was added
    added_by: { type: String, default: "0" }, 
    updated_on: { type: Date,default:null }, 
    updated_by :{ type: String, default: "0" } 
});

module.exports = mongoose.model('Coupon', couponSchema);
