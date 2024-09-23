const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },       // Product name/title
  description: { type: String, required: true }, // Product description
  price: { type: Number, required: true },       // Current price
  original_price: { type: Number },               // Original price before discount
  discount_percentage: { type: Number },         // Discount percentage
  deal_type: { type: String },                   // Deal type (e.g., "Loot Deals")
  category: [{ type: String }],                   // Array of categories
  imageUrl: { type: String, required: true },    // Path to the stored image
  link: { type: String, required: true },       // Link to the product/deal page
  is_active: { type: Boolean, default: true },   // Whether the product is active
  added_on: { type: Date, default: Date.now },     // Timestamp of when the product was added
  added_by: { type: String, default: "0" },       // Added by user (optional)
  updated_on: { type: Date, default: null },     // Updated timestamp
  updated_by: { type: String, default: "0" }     // Updated by user (optional)
});

module.exports = mongoose.model('Product', productSchema);