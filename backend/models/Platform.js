// models/Platform.js
const mongoose = require('mongoose');

const PlatformSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  platformName: {
    type: String,
    required: true,
  },
  platformPassword: {
    type: String,
    required: true,
  }
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
});

module.exports = mongoose.model('Platform', PlatformSchema);
