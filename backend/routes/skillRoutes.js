const express = require('express');
const router = express.Router();
const {
  createSkill,
  getSkills,
  getSkillById,
  updateSkill,
  deleteSkill,
  likeSkill,
  commentSkill,
  getTrendingSkills,
} = require('../controllers/skillController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, createSkill).get(getSkills);
router.route('/trending').get(getTrendingSkills);
router.route('/:id').get(getSkillById).put(protect, updateSkill).delete(protect, deleteSkill);
router.route('/:id/like').post(protect, likeSkill);
router.route('/:id/comment').post(protect, commentSkill);

module.exports = router;
