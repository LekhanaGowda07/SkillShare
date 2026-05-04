const Skill = require('../models/Skill');
const Comment = require('../models/Comment');
const Notification = require('../models/Notification');

// Create a new skill post
const createSkill = async (req, res) => {
  const { title, description, category, image, videoUrl } = req.body;

  if (!title || !description || !category) {
    return res.status(400).json({ message: 'Title, description, and category are required' });
  }

  const skill = await Skill.create({
    title,
    description,
    category,
    image,
    videoUrl,
    user: req.user ? req.user._id : null,
  });
  res.status(201).json(skill);
};

// Get all skill posts
const getSkills = async (req, res) => {
  const { search, category } = req.query;
  const query = {};

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { category: { $regex: search, $options: 'i' } },
    ];
  }

  if (category && category !== 'All') {
    query.category = category;
  }

  const skills = await Skill.find(query)
    .populate('user', 'name profilePicture')
    .sort({ createdAt: -1 });
  res.status(200).json(skills);
};

// Get single skill post
const getSkillById = async (req, res) => {
  const skill = await Skill.findById(req.params.id).populate('user', 'name profilePicture');

  if (!skill) {
    return res.status(404).json({ message: 'Skill post not found' });
  }

  res.status(200).json(skill);
};

// Update a skill post
const updateSkill = async (req, res) => {
  const { title, description, category, image, videoUrl } = req.body;
  const skill = await Skill.findById(req.params.id);

  if (!skill) {
    return res.status(404).json({ message: 'Skill post not found' });
  }

  // Check ownership
  if (skill.user && skill.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'Not authorized to update this skill' });
  }

  skill.title = title || skill.title;
  skill.description = description || skill.description;
  skill.category = category || skill.category;
  skill.image = image || skill.image;
  skill.videoUrl = videoUrl || skill.videoUrl;

  const updatedSkill = await skill.save();
  res.status(200).json(updatedSkill);
};

// Delete a skill post
const deleteSkill = async (req, res) => {
  const skill = await Skill.findById(req.params.id);

  if (!skill) {
    return res.status(404).json({ message: 'Skill post not found' });
  }

  // Check ownership
  if (skill.user && skill.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'Not authorized to delete this skill' });
  }

  await Comment.deleteMany({ skillId: skill._id });
  await skill.deleteOne();
  res.status(200).json({ message: 'Skill post deleted' });
};

// Like a skill post
const likeSkill = async (req, res) => {
  const skill = await Skill.findById(req.params.id);

  if (!skill) {
    return res.status(404).json({ message: 'Skill post not found' });
  }

  const userId = req.user._id;
  const isLiked = skill.likedBy.includes(userId);

  if (isLiked) {
    // Unlike
    skill.likedBy = skill.likedBy.filter(id => id.toString() !== userId.toString());
    skill.likes = Math.max(0, skill.likes - 1);
  } else {
    // Like
    skill.likedBy.push(userId);
    skill.likes += 1;
    
    await Notification.create({
      message: `Your skill post "${skill.title}" received a new like!`,
      type: 'like',
      user: skill.user
    });
  }

  const updatedSkill = await skill.save();
  res.status(200).json(updatedSkill);
};

// Add comment to skill post
const commentSkill = async (req, res) => {
  const { text } = req.body;
  const skill = await Skill.findById(req.params.id);

  if (!skill) {
    return res.status(404).json({ message: 'Skill post not found' });
  }

  if (!text) {
    return res.status(400).json({ message: 'Comment text is required' });
  }

  const user = req.user ? req.user.name : 'Anonymous';
  const comment = await Comment.create({ user, text, skillId: skill._id });
  skill.comments.push({ user: comment.user, text: comment.text });
  await skill.save();

  await Notification.create({
    message: `${user} commented on "${skill.title}": ${comment.text}`,
    type: 'comment',
  });

  res.status(201).json({ comment, skill });
};

// Get trending skill posts based on likes and comments
const getTrendingSkills = async (req, res) => {
  const skills = await Skill.find().populate('user', 'name profilePicture').lean();
  const trending = skills
    .map((skill) => ({
      ...skill,
      score: (skill.likes || 0) * 2 + (skill.comments?.length || 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  res.status(200).json(trending);
};

module.exports = {
  createSkill,
  getSkills,
  getSkillById,
  updateSkill,
  deleteSkill,
  likeSkill,
  commentSkill,
  getTrendingSkills,
};
