const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  message: {
    type: String,
    required: [true, 'Notification must have a message'],
    trim: true,
  },
  type: {
    type: String,
    required: [true, 'Notification type is required'],
    enum: ['like', 'comment', 'system'],
    default: 'system',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false, // For now, system notifications might not have a specific user
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Notification', notificationSchema);
