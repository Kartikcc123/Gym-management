const express = require('express');
const router = express.Router();

// Import the controller functions
const { 
  registerUser, 
  loginUser, 
  getMe, 
  forgotPassword, 
  resetPassword 
} = require('../controllers/authController');

const { protect } = require('../middleware/authMiddleware');

// Define Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);

// Forgot Password Routes
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);

module.exports = router;