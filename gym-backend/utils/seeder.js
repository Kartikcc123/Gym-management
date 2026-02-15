const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

// Import Models
const User = require('../models/User');
const Role = require('../models/Role');
const Permission = require('../models/Permission');

dotenv.config();

// Connect DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected for Seeding...'))
  .catch(err => { console.error(err); process.exit(1); });

const importData = async () => {
  try {
    // 1. Clear existing data (Optional: Be careful in production!)
    await Permission.deleteMany();
    await Role.deleteMany();
    await User.deleteMany();

    console.log('Data Cleared...');

    // 2. Create Permissions
    const permissions = await Permission.insertMany([
      { name: 'view_dashboard', description: 'Can view admin dashboard' },
      { name: 'manage_users', description: 'Can ban/delete users' },
      { name: 'manage_content', description: 'Can edit content' },
      { name: 'view_audit_logs', description: 'Can view security logs' }
    ]);

    const permIds = permissions.map(p => p._id); // Get all permission IDs

    // 3. Create Roles
    const superAdminRole = await Role.create({
      name: 'SuperAdmin',
      permissions: permIds // SuperAdmin gets ALL permissions
    });

    const moderatorRole = await Role.create({
      name: 'Moderator',
      permissions: [permIds[0], permIds[2]] // Only dashboard & content
    });

    // 4. Create Super Admin User
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt); // Change this password!

    await User.create({
      email: 'admin@example.com',
      password: hashedPassword,
      role: superAdminRole._id,
      isBanned: false
    });

    console.log('✅ Seeding Complete! Login with: admin@example.com / admin123');
    process.exit();

  } catch (error) {
    console.error('❌ Seeding Failed:', error);
    process.exit(1);
  }
};

// Run the function
importData();