const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  followUser,
  unfollowUser,
  getProfileStats,
  updateProfile,
  getFollowingList,
  getFollowersDetails,
  getFollowingDetails,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.post('/follow/:id', protect, followUser);
router.post('/unfollow/:id', protect, unfollowUser);
router.get('/stats/:id', getProfileStats);
router.get('/following', protect, getFollowingList);
router.get('/followers/list/:id', getFollowersDetails);
router.get('/following/list/:id', getFollowingDetails);

module.exports = router;
