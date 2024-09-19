const mongoose = require('mongoose')

// Category Schema
const categorySchema = new mongoose.Schema({
    title: { type: String, required: true },          // Category title
    value: { type: String, required: true,unique:true },          // Category value
    description: { type: String, required: true },    // Category description
    is_active: { type: Boolean, default: true },      // Whether to show the category
    added_on: { type: Date, default: Date.now },// Timestamp of when the category was added
    added_by: { type: String, default: "0" }, 
    updated_on: { type: Date,default:null }, 
    updated_by :{ type: String, default: "0" }
  });
  
  // Export the models separately
  
  module.exports = mongoose.model('Category', categorySchema);