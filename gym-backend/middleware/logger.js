const AuditLog = require('../models/AuditLog');

/**
 * Log sensitive admin actions to the database.
 * @param {Object} req - The Express request object (to extract Admin ID & IP)
 * @param {String} action - The action code (e.g., "DELETE_USER")
 * @param {String} targetId - The ID of the object being modified
 * @param {Object} details - Any extra JSON data to store
 */
const logAdminAction = async (req, action, targetId = null, details = {}) => {
  try {
    // Ensure we have a logged-in admin
    if (!req.user || !req.user._id) {
      console.warn("Attempted to log admin action without authenticated user.");
      return;
    }

    await AuditLog.create({
      adminId: req.user._id,
      action: action,
      targetId: targetId,
      details: details,
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent')
    });

    console.log(`[AUDIT] Admin ${req.user._id} performed ${action}`);
  } catch (error) {
    // Don't crash the app if logging fails, but alert the console
    console.error("Audit Logging Failed:", error);
  }
};

module.exports = { logAdminAction };