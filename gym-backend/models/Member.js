const memberSchema = mongoose.Schema({
  // ... existing fields
  membershipStatus: {
    type: String,
    enum: ['active', 'expired', 'pending'],
    default: 'active'
  },
  endDate: { type: Date, required: true, index: true }, // Index for fast expiry queries
  // ...
});

// Middleware to auto-update status if expired
memberSchema.pre('find', function() {
    this.where({ membershipStatus: { $ne: 'deleted' } });
});