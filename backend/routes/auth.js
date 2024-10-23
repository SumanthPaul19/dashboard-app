const express = require('express');
const User = require('../models/User'); 
const bcrypt = require('bcryptjs'); 
const router = express.Router();

// Registration Route
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, contact, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      email: email.toLowerCase(), // Store email in lowercase
      contact,
      password: hashedPassword,
    });

    // Save user to the database
    await newUser.save();
    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  console.log("Email:", email); 
  console.log("Password:", password); 

  try {
    // Find user by email (case-insensitive)
    const user = await User.findOne({ email: email.toLowerCase() });
    console.log("Found User:", user); 

    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' }); 
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password Match:", isMatch); 

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' }); 
    }

    // Return user data excluding the password
    const { password: _, ...userData } = user._doc;
    return res.json({ user: userData }); // Send user data excluding password
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
