const Lead = require('../models/Lead');
const Member = require('../models/Member');

// Convert Lead to Member
const convertLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: 'Lead not found' });

    // Create Member from Lead data
    const newMember = await Member.create({
      name: lead.name,
      phone: lead.phone,
      email: lead.email,
      startDate: new Date(),
      // Add default logic for duration/plan here
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)), 
      membershipStatus: 'active'
    });

    // Update Lead status
    lead.status = 'converted';
    await lead.save();

    res.status(200).json({ success: true, member: newMember });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};