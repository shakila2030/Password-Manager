// routes/platforms.js
const express = require('express');
const Platform = require('../models/Platform');
const User = require('../models/User'); // Assuming you have a User model
const router = express.Router();

// Add a new platform for the user
router.post('/', async (req, res) => {
  const { userId, platformName, platformPassword } = req.body;

  if (!userId || !platformName || !platformPassword) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if the user exists in the User collection
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new platform for the user
    const newPlatform = new Platform({
      userId,
      platformName,
      platformPassword, // No hashing applied here
    });

    // Save the platform to the database
    await newPlatform.save();

    return res.status(201).json({ message: 'Platform added successfully', platform: newPlatform });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error });
  }
});


// Get all platforms and passwords for a specific user by userId
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
  
    try {
      // Find platforms for the given userId
      const platforms = await Platform.find({ userId });
  
      if (platforms.length === 0) {
        return res.status(404).json({ message: 'No platforms found for this user' });
      }
  
      // Return the list of platforms and their passwords
      return res.status(200).json({ platforms });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error', error });
    }
  });


  // Update platform password for a specific user
router.put('/change-password', async (req, res) => {
    const { userId, platformName, newPlatformPassword } = req.body;
  
    // Validate input data
    if (!userId || !platformName || !newPlatformPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    try {
      // Check if the user exists
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the platform exists for the user
      const platform = await Platform.findOne({ userId, platformName });
      if (!platform) {
        return res.status(404).json({ message: 'Platform not found for this user' });
      }
  
      // Update the platform password
      platform.platformPassword = newPlatformPassword;
  
      // Save the updated platform
      await platform.save();
  
      return res.status(200).json({ message: 'Password updated successfully', platform });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error', error });
    }
  });

module.exports = router;
