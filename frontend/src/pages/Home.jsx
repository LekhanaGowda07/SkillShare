import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { skillsAPI } from '../api';
import SkillReel from '../components/SkillReel';
import './Home.css';

const Home = () => {
  const location = useLocation();
  const initialId = location.state?.initialId;
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await skillsAPI.getAll();
      setSkills(response.data || []);
    } catch (err) {
      setError('Failed to load skills. Please try again later.');
      setSkills([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="home-reel-page">
      {!isLoading && (
        <>
          {error && (
            <div className="error-floating">
              <span>⚠️ {error}</span>
            </div>
          )}

          {skills.length > 0 ? (
            <SkillReel skills={skills} onLoadMore={fetchSkills} initialId={initialId} />
          ) : (
            <div className="reel-empty">
              <div className="reel-empty-content">
                <span className="empty-emoji">🎓</span>
                <h2>No Skills Found</h2>
                <p>Be the first to share a skill!</p>
              </div>
            </div>
          )}
        </>
      )}

      {isLoading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading amazing skills...</p>
        </div>
      )}
    </div>
  );
};

export default Home;
