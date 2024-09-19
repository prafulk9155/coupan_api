const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },          // Product name/title
  description: { type: String, required: true },    // Product description
  price: { type: Number, required: true },          // Current price
  original_price: { type: Number },                 // Original price before discount
  discount_percentage: { type: Number },            // Discount percentage
  deal_type: { type: String },                      // Deal type (e.g., "Loot Deals")
  category: [{ type: String }],                     // Array of categories
  imageUrl: { type: String, required: true },       // URL of the product image
  link: { type: String, required: true },           // Link to the product/deal page
  is_active: { type: Boolean, default: true },      // Whether the product is active
  added_on: { type: Date, default: Date.now },
  added_by: { type: String, default: "0" },
  updated_on: { type: Date, default: null },
  updated_by: { type: String, default: "0" }
  // Timestamp of when the product was added
});

module.exports = mongoose.model('Product', productSchema);
