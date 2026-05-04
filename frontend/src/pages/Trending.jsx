import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { skillsAPI } from '../api';
import { motion } from 'framer-motion';
import { Compass, Heart, MessageCircle, Search } from 'lucide-react';
import './Trending.css';

const Trending = () => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Programming', 'Design', 'Writing', 'Drawing', 'Music', 'Sports', 'Language', 'Science', 'Mathematics', 'Other'];

  useEffect(() => {
    fetchSkills();
  }, [selectedCategory]);

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const response = await skillsAPI.getAll(searchTerm, selectedCategory === 'All' ? '' : selectedCategory);
      setSkills(response.data || []);
    } catch (error) {
      console.error('Error fetching skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchSkills();
  };

  return (
    <div className="trending-page">
      <div className="trending-header">
        <Compass size={32} className="fire-icon" />
        <h1>Explore Skills</h1>
      </div>

      <div className="explore-controls">
        <form onSubmit={handleSearch} className="search-bar-explore">
          <Search size={20} />
          <input 
            type="text" 
            placeholder="Search for skills..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </form>

        <div className="categories-scroll">
          {categories.map(cat => (
            <button 
              key={cat} 
              className={`category-tag ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="trending-grid">
        {loading ? (
          <div className="loading">Searching the universe...</div>
        ) : skills.length > 0 ? (
          skills.map((skill, index) => (
            <motion.div 
              key={skill._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="trending-card glass"
              onClick={() => navigate('/', { state: { initialId: skill._id } })}
              style={{ cursor: 'pointer' }}
            >
              <img src={skill.image || 'https://via.placeholder.com/300?text=Skill'} alt={skill.title} className="trending-img" />
              <div className="trending-content">
                <h3>{skill.title}</h3>
                <p className="trending-category">{skill.category}</p>
                <div className="trending-stats">
                  <span><Heart size={16} fill="#ff3040" color="#ff3040" /> {skill.likes || 0}</span>
                  <span><MessageCircle size={16} fill="#0095f6" color="#0095f6" /> {skill.comments?.length || 0}</span>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="empty-trending">No skills found in this category</div>
        )}
      </div>
    </div>
  );
};

export default Trending;
