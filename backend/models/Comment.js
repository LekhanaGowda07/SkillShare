const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    trim: true,
    default: 'Anonymous',
  },
  text: {
    type: String,
    required: true,
    trim: true,
  },
  skillId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Skill',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Comment', commentSchema);
