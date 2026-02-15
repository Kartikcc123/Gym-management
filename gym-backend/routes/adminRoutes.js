const express = require('express');
const router = express.Router();
const { globalSearch } = require('../controllers/searchController'); // Optional: For global search functionality

// 1. Import Middleware
const { protect, authorize } = require('../middleware/authMiddleware');

// 2. Import Controllers
const { 
  getSystemStats, 
  banUser, 
  getAuditLogs 
} = require('../controllers/adminController');

// =========================================================================
// GLOBAL MIDDLEWARE
// =========================================================================
// All routes in this file are protected. 
// A valid JWT token is required to access anything below.
router.use(protect); 



// =========================================================================
// ADMIN ROUTES
// =========================================================================

/**
 * @route   GET /api/admin/stats
 * @desc    Get high-level dashboard statistics (Revenue, User Count, etc.)
 * @access  Private (Requires 'view_dashboard' permission)
 */
router.get('/stats', 
    authorize('view_dashboard'), 
    getSystemStats
);

router.get('/global-search', authorize('view_dashboard'), globalSearch); 

/**
 * @route   GET /api/admin/audit-logs
 * @desc    View security logs of admin actions
 * @access  Private (Requires 'view_audit_logs' permission)
 */
router.get('/audit-logs', 
    authorize('view_audit_logs'), 
    getAuditLogs
);

/**
 * @route   PUT /api/admin/users/:id/ban
 * @desc    Ban or Unban a specific user
 * @access  Private (Requires 'manage_users' permission)
 */
router.put('/users/:id/ban', 
    authorize('manage_users'), 
    banUser
);


module.exports = router;