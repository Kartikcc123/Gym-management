const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto'); // Built-in Node module

const UserSchema = new mongoose.Schema({
  // ... existing fields (name, email, password, role, etc.) ...
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  
  // Add these two fields:
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  
  createdAt: { type: Date, default: Date.now }
});

// models/User.js (Partial)
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  phone: String,
  membershipPlan: { type: String, enum: ['Silver', 'Gold', 'Platinum'], default: 'Silver' },
  status: { type: String, enum: ['Active', 'Expired', 'Banned'], default: 'Active' },
  joinDate: { type: Date, default: Date.now },
  expiryDate: Date,
  lastCheckIn: Date,
  billingHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Invoice' }]
});

// ... existing pre-save hash middleware ...

// Method to generate and hash the password reset token
UserSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set expire (10 minutes)
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model('User', UserSchema);