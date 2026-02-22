const mongoose = require('mongoose');

const leadSchema = mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  status: {
    type: String,
    enum: ['new', 'contacted', 'trial', 'converted', 'lost'],
    default: 'new'
  },
  interestedPlan: { type: String },
  trialDate: { type: Date },
  notes: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Lead', leadSchema);