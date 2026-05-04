const Notification = require('../models/Notification');

// Get all notifications
const getNotifications = async (req, res) => {
  const notifications = await Notification.find().sort({ createdAt: -1 });
  res.status(200).json(notifications);
};

module.exports = {
  getNotifications,
};
