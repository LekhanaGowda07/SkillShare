import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Share2, Trash2, Play, Send, X } from 'lucide-react';
import { skillsAPI, userAPI } from '../api';
import './SkillReel.css';

const CommentModal = ({ isOpen, onClose, skill, onAddComment }) => {
  const [commentText, setCommentText] = useState('');
  
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(skill._id, commentText);
    setCommentText('');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="comment-modal-overlay" onClick={onClose}
    >
      <motion.div 
        initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
        className="comment-modal-content glass" onClick={e => e.stopPropagation()}
      >
        <div className="comment-modal-header">
          <h3>Comments</h3>
          <button onClick={onClose}><X /></button>
        </div>
        <div className="comment-list">
          {skill.comments?.length > 0 ? skill.comments.map((c, i) => (
            <div key={i} className="comment-item">
              <span className="comment-user">{c.user}</span>
              <p className="comment-text">{c.text}</p>
            </div>
          )) : <div className="no-comments">No comments yet. Start the conversation!</div>}
        </div>
        <form className="comment-input-area" onSubmit={handleSubmit}>
          <input 
            placeholder="Add a comment..." 
            value={commentText} 
            onChange={e => setCommentText(e.target.value)} 
          />
          <button type="submit"><Send size={20} /></button>
        </form>
      </motion.div>
    </motion.div>
  );
};

const SkillReel = ({ skills, onLoadMore, initialId }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likes, setLikes] = useState({});
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [activeSkill, setActiveSkill] = useState(null);
  const [followingUsers, setFollowingUsers] = useState(new Set());
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    fetchFollowing();
    const likesMap = {};
    skills.forEach(skill => {
      likesMap[skill._id] = skill.likes || 0;
    });
    setLikes(likesMap);

    if (initialId) {
      const targetIndex = skills.findIndex(s => s._id === initialId);
      if (targetIndex !== -1) {
        setCurrentIndex(targetIndex);
        setTimeout(() => {
          scrollContainerRef.current?.scrollTo({
            top: targetIndex * scrollContainerRef.current.clientHeight,
            behavior: 'auto'
          });
        }, 100);
      }
    }
  }, [skills, initialId]);

  const fetchFollowing = async () => {
    try {
      const response = await userAPI.getFollowing();
      setFollowingUsers(new Set(response.data));
    } catch (error) { console.error(error); }
  };

  const handleScroll = (e) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollPosition = container.scrollTop;
    const containerHeight = container.clientHeight;
    const newIndex = Math.round(scrollPosition / containerHeight);
    
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }

    if (newIndex >= skills.length - 2) {
      onLoadMore && onLoadMore();
    }
  };

  const handleLike = async (skillId) => {
    if (likedPosts.has(skillId)) return;
    try {
      await skillsAPI.like(skillId);
      setLikes(prev => ({ ...prev, [skillId]: (prev[skillId] || 0) + 1 }));
      setLikedPosts(prev => new Set(prev).add(skillId));
    } catch (error) { console.error('Error liking skill:', error); }
  };

  const handleAddComment = async (skillId, text) => {
    try {
      await skillsAPI.comment(skillId, { text });
      if (onLoadMore) onLoadMore();
      setIsCommentModalOpen(false);
    } catch (error) { console.error('Error commenting:', error); }
  };

  const handleShare = (skill) => {
    const shareData = {
      title: skill.title,
      text: `Check out this skill: ${skill.title}`,
      url: skill.videoUrl || window.location.href,
    };
    if (navigator.share) {
      navigator.share(shareData).catch(console.error);
    } else {
      navigator.clipboard.writeText(shareData.url);
      alert('Link copied to clipboard!');
    }
  };

  const handleFollow = async (userId) => {
    if (!userId) {
      console.error('No User ID provided for following');
      return;
    }
    
    // Ensure we are working with a string ID
    const targetId = userId._id || userId;
    console.log('Attempting to follow/unfollow user:', targetId);

    try {
      if (followingUsers.has(targetId)) {
        await userAPI.unfollow(targetId);
        setFollowingUsers(prev => {
          const next = new Set(prev);
          next.delete(targetId);
          return next;
        });
        console.log('Unfollowed successfully');
      } else {
        await userAPI.follow(targetId);
        setFollowingUsers(prev => new Set(prev).add(targetId));
        console.log('Followed successfully');
      }
    } catch (error) { 
      console.error('Error in handleFollow:', error.response?.data?.message || error.message);
      alert(error.response?.data?.message || 'Action failed');
    }
  };

  if (skills.length === 0) {
    return (
      <div className="reel-empty">
        <div className="reel-empty-content">
          <span className="empty-emoji">🎓</span>
          <h2>No Skills Yet</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="skill-reel-container">
      <div className="skill-reel" ref={scrollContainerRef} onScroll={handleScroll}>
        {skills.map((skill, index) => (
          <div key={skill._id} className="reel-item">
            <div className="reel-background">
              {skill.image ? <img src={skill.image} alt={skill.title} className="reel-image" /> : <div className="reel-placeholder"><span>🎨</span></div>}
              <div className="reel-overlay"></div>
            </div>

            <AnimatePresence mode='wait'>
              {index === currentIndex && (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }}
                  className="reel-content"
                >
                  <div className="reel-user-info">
                    <img src={skill.user?.profilePicture || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} alt="" className="user-avatar-sm" />
                    <span className="user-name-sm">{skill.user?.name || 'Anonymous'}</span>
                    <button 
                      className={`follow-btn-sm ${(followingUsers.has(skill.user?._id) || followingUsers.has(skill.user)) ? 'following' : ''}`}
                      onClick={() => handleFollow(skill.user)}
                    >
                      {(followingUsers.has(skill.user?._id) || followingUsers.has(skill.user)) ? 'Following' : 'Follow'}
                    </button>
                  </div>
                  <h2 className="reel-title">{skill.title}</h2>
                  <span className="reel-category">{skill.category}</span>
                  <p className="reel-description">{skill.description}</p>
                  {skill.videoUrl && (
                    <motion.a whileHover={{ scale: 1.05 }} href={skill.videoUrl} target="_blank" rel="noopener noreferrer" className="reel-video-link">
                      <Play size={18} fill="white" /> Watch Tutorial
                    </motion.a>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="reel-actions">
              <motion.button className={`reel-action-btn ${likedPosts.has(skill._id) ? 'liked' : ''}`} onClick={() => handleLike(skill._id)}>
                <Heart size={28} fill={likedPosts.has(skill._id) ? "#ff3040" : "none"} stroke={likedPosts.has(skill._id) ? "#ff3040" : "white"} />
                <span className="action-count">{likes[skill._id] || 0}</span>
              </motion.button>

              <motion.button className="reel-action-btn" onClick={() => { setActiveSkill(skill); setIsCommentModalOpen(true); }}>
                <MessageCircle size={28} color="white" />
                <span className="action-count">{skill.comments?.length || 0}</span>
              </motion.button>

              <motion.button className="reel-action-btn" onClick={() => handleShare(skill)}>
                <Share2 size={28} color="white" />
              </motion.button>
              
              <motion.button className="reel-action-btn" onClick={() => skillsAPI.delete(skill._id).then(() => window.location.reload())}>
                <Trash2 size={28} color="white" />
              </motion.button>
            </div>
          </div>
        ))}
      </div>

      <CommentModal isOpen={isCommentModalOpen} onClose={() => setIsCommentModalOpen(false)} skill={activeSkill} onAddComment={handleAddComment} />

      <div className="reel-progress-bar">
        <motion.div className="progress-fill" animate={{ width: `${((currentIndex + 1) / skills.length) * 100}%` }}></motion.div>
      </div>
    </div>
  );
};

export default SkillReel;
