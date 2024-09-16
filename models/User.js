// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Unique email
  gender: { 
    type: String, 
    required: true, 
    enum: ['male', 'female', 'other', 'not to say'], // Specified options
  },
  interest: { type: String }, // Optional
  phone: { type: Number, required: true, unique: true }, // Unique phone
  password: { type: String, required: true },
  address: { type: String }, // Optional
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Coupon' }],
});

// Export the User model
module.exports = mongoose.model('User', userSchema);
