const mongoose = require('mongoose')

// Category Schema
const categorySchema = new mongoose.Schema({
    title: { type: String, required: true },          
    value: { type: String, required: true,unique:true },   
    type: { type: String, required: true, },      
    description: { type: String, required: true },   
    is_active: { type: Boolean, default: true },      
    added_on: { type: Date, default: Date.now },
    added_by: { type: String, default: "0" }, 
    updated_on: { type: Date,default:null }, 
    updated_by :{ type: String, default: "0" }

  });
  
  // Export the models separately
  
  module.exports = mongoose.model('metadata', categorySchema);