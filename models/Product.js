const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },          // Product name/title
  imageUrl: { type: String, required: true },       // URL of the product image
  link: { type: String, required: true },            // Link to the product page
  show: { type: Boolean, default: true },            // Whether to show the product
  added_on: { type: Date, default: Date.now },      // Timestamp of when the product was added
});

module.exports = mongoose.model('Product', productSchema);
