import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { skillsAPI } from '../api';
import './SkillCard.css';

const SkillCard = ({ skill, onLike, onDelete, onCommentClick }) => {
  const [isLiking, setIsLiking] = useState(false);
  const [likes, setLikes] = useState(skill.likes || 0);

  const handleLike = async () => {
    setIsLiking(true);
    try {
      await skillsAPI.like(skill._id);
      setLikes(likes + 1);
      onLike && onLike();
    } catch (error) {
      console.error('Error liking skill:', error);
    } finally {
      setIsLiking(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      try {
        await skillsAPI.delete(skill._id);
        onDelete && onDelete();
      } catch (error) {
        console.error('Error deleting skill:', error);
      }
    }
  };

  return (
    <div className="skill-card slide-in">
      {skill.image && (
        <div className="skill-image-wrapper">
          <img src={skill.image} alt={skill.title} className="skill-image" />
          <div className="skill-overlay">
            {skill.videoUrl && (
              <a
                href={skill.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-icon"
              >
                ▶
              </a>
            )}
          </div>
        </div>
      )}

      <div className="skill-content">
        <div className="skill-header">
          <h3 className="skill-title">{skill.title}</h3>
          <span className="badge badge-primary">{skill.category}</span>
        </div>

        <p className="skill-description">{skill.description}</p>

        <div className="skill-meta">
          <span className="meta-item">
            💬 {skill.comments?.length || 0} Comments
          </span>
          <span className="meta-item">
            ⏱ {new Date(skill.createdAt).toLocaleDateString()}
          </span>
        </div>

        <div className="skill-actions">
          <button
            className={`btn btn-icon like-btn ${isLiking ? 'loading' : ''}`}
            onClick={handleLike}
            disabled={isLiking}
          >
            ❤️ {likes}
          </button>

          <button
            className="btn btn-icon comment-btn"
            onClick={() => onCommentClick && onCommentClick(skill._id)}
          >
            💬
          </button>

          <button
            className="btn btn-icon delete-btn"
            onClick={handleDelete}
          >
            🗑
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
