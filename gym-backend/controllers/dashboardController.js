const Member = require('../models/Member');
const Payment = require('../models/Payment');

// GET /api/dashboard/stats
const getDashboardStats = async (req, res) => {
  const today = new Date();
  const threeDaysFromNow = new Date();
  threeDaysFromNow.setDate(today.getDate() + 3);
  
  const sevenDaysFromNow = new Date();
  sevenDaysFromNow.setDate(today.getDate() + 7);

  try {
    // 1. Expiry Alerts
    const expiringSoon = await Member.find({
      endDate: { $gte: today, $lte: sevenDaysFromNow },
      membershipStatus: 'active'
    }).select('name endDate phone photo');

    // 2. Real Finance Data (Current Month)
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const revenue = await Payment.aggregate([
      { $match: { createdAt: { $gte: startOfMonth }, status: 'captured' } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    // 3. Member Counts
    const activeMembers = await Member.countDocuments({ membershipStatus: 'active' });
    const newLeads = await Lead.countDocuments({ status: 'new' });

    res.json({
      revenue: revenue[0]?.total || 0,
      activeMembers,
      newLeads,
      expiringMembers: expiringSoon
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};