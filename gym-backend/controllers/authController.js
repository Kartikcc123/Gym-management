const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer'); // Ensure you ran: npm install nodemailer
const User = require('../models/User');

// --- Helper: Generate JWT ---
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// =========================================================================
// 1. REGISTER USER
// =========================================================================
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const normalizedEmail = email?.trim().toLowerCase();

  try {
    if (!name || !normalizedEmail || !password) {
      return res.status(400).json({ message: 'Please add all fields' });
    }

    // Check if user exists
    const userExists = await User.findOne({ email: normalizedEmail });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =========================================================================
// 2. LOGIN USER
// =========================================================================
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const normalizedEmail = email?.trim().toLowerCase();

  try {
    const user = await User.findOne({ email: normalizedEmail }).select('+password');

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          subscription: user.subscription
        },
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =========================================================================
// 3. GET CURRENT USER (ME)
// =========================================================================
const getMe = async (req, res) => {
  res.status(200).json({
    user: req.user
  });
};

// =========================================================================
// 4. FORGOT PASSWORD
// =========================================================================
const forgotPassword = async (req, res) => {
  let user; // <--- FIX: Defined here so 'catch' block can see it

  try {
    const normalizedEmail = req.body.email?.trim().toLowerCase();
    user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 1. Generate Token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // 2. Hash & Save
    user.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // 10 Minutes Expiry
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; 

    await user.save({ validateBeforeSave: false });

    // 3. Create URL
    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

    // 4. Send Email
    // Check for credentials
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.error("CRITICAL ERROR: Email credentials missing in .env file");
        throw new Error("Server configuration error: Missing email credentials");
    }

    const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // Use 'false' for port 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // This bypasses some strict SSL checks
    ciphers: 'SSLv3'
  }
});

    const message = {
      from: `IronCore Support <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: 'Password Reset Request',
      html: `
        <h1>Password Reset</h1>
        <p>You requested a password reset. Click the button below:</p>
        <a href="${resetUrl}" style="background:#dc2626; color:white; padding:10px 20px; text-decoration:none; border-radius:5px;">Reset Password</a>
        <p style="margin-top:20px;">Or copy this link: ${resetUrl}</p>
      `
    };

    await transporter.sendMail(message);

    res.status(200).json({ success: true, data: 'Email sent' });

  } catch (error) {
    console.error("Email Error:", error.message);
    
    // SAFE CLEANUP: If user was found but email failed, clear the token
    if (user) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
    }
    
    return res.status(500).json({ message: 'Email could not be sent' });
  }
};

// =========================================================================
// 5. RESET PASSWORD
// =========================================================================
const resetPassword = async (req, res) => {
  try {
    // 1. Hash the token from URL
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.resettoken)
      .digest('hex');

    // 2. Find user with valid token & expiry
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // 3. Set new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
    
    // 4. Clear tokens
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =========================================================================
// EXPORTS (This fixes your "handler must be a function" error)
// =========================================================================
module.exports = {
  registerUser,
  loginUser,
  getMe,
  forgotPassword, // <--- Ensure this line exists!
  resetPassword,
};