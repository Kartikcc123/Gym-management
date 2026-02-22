const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // --- Basic Info ---
  name: { 
    type: String, 
    required: [true, 'Please add a name'] 
  },
  email: { 
    type: String, 
    required: [true, 'Please add an email'], 
    unique: true,
    trim: true,
    lowercase: true
  },
  password: { 
    type: String, 
    required: [true, 'Please add a password'],
    select: false // Dont send password in query results
  },

  // --- Role Based Access Control (RBAC) ---
  role: {
    type: String,
    enum: ['admin', 'manager', 'receptionist', 'trainer', 'member'],
    default: 'member' // Default role
  },

  // --- Optional: Member Specific Fields ---
  // (Only used if the user is a gym member)
  membershipPlan: { 
    type: String, 
    enum: ['Silver', 'Gold', 'Platinum', 'None'], 
    default: 'None' 
  },
  status: { 
    type: String, 
    enum: ['Active', 'Expired', 'Banned', 'Pending'], 
    default: 'Active' 
  },
  
  // --- Password Reset Tokens ---
  resetPasswordToken: String,
  resetPasswordExpire: Date,

}, { 
  timestamps: true // Automatically creates createdAt and updatedAt
});

module.exports = mongoose.model('User', userSchema);