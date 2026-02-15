// Add these imports at the top if missing
const User = require('../models/User');
const AuditLog = require('../models/AuditLog');
// const Order = require('../models/Order'); // Uncomment if you have an Order model

// @desc    Global Search across multiple collections
// @route   GET /api/admin/global-search?query=...
const globalSearch = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.length < 3) {
      return res.status(400).json({ message: "Search query must be at least 3 chars." });
    }

    // Create a case-insensitive regex for fuzzy matching
    const searchRegex = new RegExp(query, 'i');

    // RUN QUERIES IN PARALLEL (Performance Optimization)
    // We use Promise.allSettled so if one fails (e.g., Orders), the others still return data.
    const [users, logs] = await Promise.all([
      // 1. Search Users (by email)
      User.find({ email: searchRegex })
          .select('email role isBanned') // Select only what we need for the UI
          .limit(5),

      // 2. Search Audit Logs (by action type)
      AuditLog.find({ action: searchRegex })
          .select('action targetId createdAt')
          .limit(5),
          
      // 3. (Optional) Search Orders
      // Order.find({ _id: query }) // Exact match for IDs usually better
    ]);

    res.json({
      users,
      logs,
      count: users.length + logs.length
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Global search failed." });
  }
};

module.exports = { globalSearch, ...otherExports };