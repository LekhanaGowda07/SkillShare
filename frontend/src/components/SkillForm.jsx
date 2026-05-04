import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload, Video, Tag, AlignLeft, Send, X } from 'lucide-react';
import { skillsAPI } from '../api';
import './SkillForm.css';

const SkillForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Programming',
    image: '',
    videoUrl: '',
  });

  const categories = [
    'Programming', 'Design', 'Writing', 'Drawing', 'Music', 'Sports', 'Language', 'Science', 'Mathematics', 'Other',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await skillsAPI.create(formData);
      navigate('/');
    } catch (err) {
      setError('Failed to create skill. Please login again or check your data.');
      setIsLoading(false);
    }
  };

  return (
    <div className="skill-form-page">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="form-card-premium glass"
      >
        <div className="form-header-premium">
          <button className="close-btn" onClick={() => navigate('/')}><X /></button>
          <h2>Create New Post</h2>
          <button className="share-btn-top" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? '...' : 'Share'}
          </button>
        </div>

        <div className="form-body-premium">
          <div className="media-preview-section">
            {formData.image ? (
              <div className="preview-container-main">
                <img src={formData.image} alt="Preview" />
                <button className="remove-media" onClick={() => setFormData({...formData, image: ''})}>Remove</button>
              </div>
            ) : (
              <div className="upload-placeholder">
                <Upload size={48} />
                <p>Enter Image URL below to see preview</p>
              </div>
            )}
          </div>

          <div className="inputs-section">
            <div className="input-row">
              <Tag size={20} />
              <select name="category" value={formData.category} onChange={handleChange}>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>

            <div className="input-row">
              <input 
                type="text" 
                name="title" 
                placeholder="Write a title..." 
                value={formData.title} 
                onChange={handleChange} 
                required
              />
            </div>

            <div className="input-row textArea-row">
              <AlignLeft size={20} />
              <textarea 
                name="description" 
                placeholder="Write a caption/description..." 
                value={formData.description} 
                onChange={handleChange} 
                required
              />
            </div>

            <div className="input-row">
              <Upload size={20} />
              <input 
                type="url" 
                name="image" 
                placeholder="Image URL (e.g., Unsplash link)" 
                value={formData.image} 
                onChange={handleChange} 
              />
            </div>

            <div className="input-row">
              <Video size={20} />
              <input 
                type="url" 
                name="videoUrl" 
                placeholder="Video URL (YouTube)" 
                value={formData.videoUrl} 
                onChange={handleChange} 
              />
            </div>
          </div>
        </div>

        {error && <div className="form-error-premium">{error}</div>}
      </motion.div>
    </div>
  );
};

export default SkillForm;
