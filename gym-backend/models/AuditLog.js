const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  adminId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  action: { 
    type: String, 
    required: true, 
    uppercase: true 
    // Examples: 'USER_BAN', 'SETTINGS_UPDATE', 'REFUND_PROCESSED'
  }, 
  targetId: { 
    type: String, 
    required: false 
    // The ID of the item being affected (e.g., the UserID being banned)
  },
  details: { 
    type: mongoose.Schema.Types.Mixed,
    required: false 
    // Snapshot of data changed (e.g., { oldRole: 'user', newRole: 'admin' })
  },
  ipAddress: {
    type: String
  },
  userAgent: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('AuditLog', auditLogSchema);