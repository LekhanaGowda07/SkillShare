const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', {
    expiresIn: '30d',
  });
};

const Follow = require('../models/Follow');

// Register new user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please add all fields' });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = await User.create({ name, email, password });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

// Authenticate a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      bio: user.bio,
      profilePicture: user.profilePicture,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

// Get user data
const getMe = async (req, res) => {
  res.status(200).json(req.user);
};

const followUser = async (req, res) => {
  const { id } = req.params;
  if (id === req.user._id.toString()) {
    return res.status(400).json({ message: 'You cannot follow yourself' });
  }
  try {
    await Follow.create({ follower: req.user._id, following: id });
    res.status(200).json({ message: 'Followed successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Already following' });
  }
};

const unfollowUser = async (req, res) => {
  const { id } = req.params;
  await Follow.findOneAndDelete({ follower: req.user._id, following: id });
  res.status(200).json({ message: 'Unfollowed successfully' });
};

const getProfileStats = async (req, res) => {
  const { id } = req.params;
  const followersCount = await Follow.countDocuments({ following: id });
  const followingCount = await Follow.countDocuments({ follower: id });
  const isFollowing = req.user ? !!(await Follow.findOne({ follower: req.user._id, following: id })) : false;
  
  res.status(200).json({ followersCount, followingCount, isFollowing });
};

const updateProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.bio = req.body.bio || user.bio;
    user.profilePicture = req.body.profilePicture || user.profilePicture;
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      bio: updatedUser.bio,
      profilePicture: updatedUser.profilePicture,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

const getFollowersDetails = async (req, res) => {
  const follows = await Follow.find({ following: req.params.id }).populate('follower', 'name profilePicture');
  const followers = follows.map(f => f.follower);
  res.status(200).json(followers);
};

const getFollowingDetails = async (req, res) => {
  const follows = await Follow.find({ follower: req.params.id }).populate('following', 'name profilePicture');
  const following = follows.map(f => f.following);
  res.status(200).json(following);
};

const getFollowingList = async (req, res) => {
  const follows = await Follow.find({ follower: req.user._id });
  const followingIds = follows.map(f => f.following.toString());
  res.status(200).json(followingIds);
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  followUser,
  unfollowUser,
  getProfileStats,
  updateProfile,
  getFollowingList,
  getFollowersDetails,
  getFollowingDetails
};
