import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { userAPI, skillsAPI } from '../api';
import { motion } from 'framer-motion';
import { Settings, Grid, Heart, MessageCircle, X, LogOut, Sun, Moon, Info } from 'lucide-react';
import './Profile.jsx.css';

const ConnectionsModal = ({ isOpen, onClose, title, users }) => {
  if (!isOpen) return null;
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="modal-overlay" onClick={onClose}>
      <motion.div initial={{ y: 50 }} animate={{ y: 0 }} className="modal-content glass connections-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button onClick={onClose}><X /></button>
        </div>
        <div className="connections-list">
          {users.length > 0 ? users.map(u => (
            <div key={u._id} className="connection-item">
              <img src={u.profilePicture || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} alt="" className="user-avatar-sm" />
              <span className="connection-name">{u.name}</span>
            </div>
          )) : <div className="empty-connections">No students here yet.</div>}
        </div>
      </motion.div>
    </motion.div>
  );
};

const SettingsModal = ({ isOpen, onClose, logout, isDarkMode, toggleTheme }) => {
  if (!isOpen) return null;
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="modal-overlay" onClick={onClose}>
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="modal-content glass settings-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Settings</h3>
          <button onClick={onClose}><X /></button>
        </div>
        <div className="settings-options">
          <div className="settings-item" onClick={toggleTheme}>
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </div>
          <div className="settings-item" onClick={() => alert('SkillShare v1.0 - A platform for students.')}>
            <Info size={20} />
            <span>About</span>
          </div>
          <div className="settings-item logout" onClick={logout}>
            <LogOut size={20} />
            <span>Logout</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const EditProfileModal = ({ isOpen, onClose, user, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    bio: user.bio || '',
    profilePicture: user.profilePicture || ''
  });

  // Ensure form data updates when modal opens or user changes
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: user.name,
        bio: user.bio || '',
        profilePicture: user.profilePicture || ''
      });
    }
  }, [isOpen, user]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="modal-overlay" onClick={onClose}>
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="modal-content glass" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Edit Profile</h3>
          <button onClick={onClose}><X /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Bio</label>
            <textarea value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Profile Picture URL</label>
            <input value={formData.profilePicture} onChange={e => setFormData({...formData, profilePicture: e.target.value})} />
          </div>
          <button type="submit" className="btn btn-primary">Save Changes</button>
        </form>
      </motion.div>
    </motion.div>
  );
};

const Profile = () => {
  const { user, logout, login } = useAuth(); // We use login to update the global auth state
  const { isDarkMode, toggleTheme } = useTheme();
  const [userSkills, setUserSkills] = useState([]);
  const [likedSkills, setLikedSkills] = useState([]);
  const [stats, setStats] = useState({ followersCount: 0, followingCount: 0 });
  const [connectionUsers, setConnectionUsers] = useState([]);
  const [connectionTitle, setConnectionTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [modals, setModals] = useState({ edit: false, settings: false, connections: false });
  const [activeTab, setActiveTab] = useState('skills');

  const fetchData = React.useCallback(async () => {
    if (!user) return;
    try {
      setLoading(true);
      const { data: skills } = await skillsAPI.getAll();
      
      const mySkills = skills.filter(s => (s.user?._id === user._id) || (s.user === user._id));
      setUserSkills(mySkills);
      
      const myLiked = skills.filter(s => s.likedBy?.some(id => id.toString() === user._id.toString()));
      setLikedSkills(myLiked);

      const { data: userStats } = await userAPI.getStats(user._id);
      setStats(userStats);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleShowConnections = async (type) => {
    try {
      const response = type === 'Followers' 
        ? await userAPI.getFollowersList(user._id)
        : await userAPI.getFollowingList(user._id);
      setConnectionUsers(response.data);
      setConnectionTitle(type);
      setModals({...modals, connections: true});
    } catch (error) { console.error(error); }
  };

  const handleUpdateProfile = async (data) => {
    try {
      const response = await userAPI.updateProfile(data);
      // Update AuthContext state
      login(response.data); 
      localStorage.setItem('user', JSON.stringify(response.data));
      alert('Profile updated successfully!');
      setModals({...modals, edit: false});
      // Optionally reload or just rely on state update
      window.location.reload(); 
    } catch (error) { 
      const msg = error.response?.data?.message || 'Update failed';
      alert(msg);
    }
  };

  if (!user) return <div className="profile-container">Please login to view your profile</div>;

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar-container">
            <img src={user.profilePicture || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} alt={user.name} className="profile-avatar" />
          </div>
          <div className="profile-info">
            <div className="profile-username-row">
              <h2 className="profile-username">{user.name}</h2>
              <button className="edit-profile-btn" onClick={() => setModals({...modals, edit: true})}>Edit Profile</button>
              <Settings className="settings-icon" size={24} onClick={() => setModals({...modals, settings: true})} style={{ cursor: 'pointer' }} />
            </div>
            <div className="profile-stats">
              <div className="stat-item"><span className="stat-count">{userSkills.length}</span> skills</div>
              <div className="stat-item clickable" onClick={() => handleShowConnections('Followers')}>
                <span className="stat-count">{stats.followersCount}</span> followers
              </div>
              <div className="stat-item clickable" onClick={() => handleShowConnections('Following')}>
                <span className="stat-count">{stats.followingCount}</span> following
              </div>
            </div>
            <div className="profile-bio">
              <p className="profile-full-name">{user.name}</p>
              <p>{user.bio || 'Sharing knowledge, one skill at a time 🎓'}</p>
            </div>
          </div>
        </div>

        <div className="profile-tabs">
          <div className={`tab-item ${activeTab === 'skills' ? 'active' : ''}`} onClick={() => setActiveTab('skills')}><Grid size={16} /> SKILLS</div>
          <div className={`tab-item ${activeTab === 'liked' ? 'active' : ''}`} onClick={() => setActiveTab('liked')}><Heart size={16} /> LIKED</div>
        </div>

        <div className="profile-skills-grid">
          {loading ? <div>Loading...</div> : (
            activeTab === 'skills' ? (
              userSkills.length > 0 ? userSkills.map((skill) => (
                <motion.div key={skill._id} whileHover={{ scale: 1.02 }} className="profile-skill-card">
                  <img src={skill.image || 'https://via.placeholder.com/300?text=Skill'} alt={skill.title} />
                  <div className="skill-card-overlay">
                    <div className="overlay-stat"><Heart size={18} fill="white" /> {skill.likes || 0}</div>
                    <div className="overlay-stat"><MessageCircle size={18} fill="white" /> {skill.comments?.length || 0}</div>
                  </div>
                </motion.div>
              )) : <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px' }}><h3>No skills shared yet</h3></div>
            ) : (
              likedSkills.length > 0 ? likedSkills.map((skill) => (
                <motion.div key={skill._id} whileHover={{ scale: 1.02 }} className="profile-skill-card">
                  <img src={skill.image || 'https://via.placeholder.com/300?text=Skill'} alt={skill.title} />
                  <div className="skill-card-overlay">
                    <div className="overlay-stat"><Heart size={18} fill="white" /> {skill.likes || 0}</div>
                    <div className="overlay-stat"><MessageCircle size={18} fill="white" /> {skill.comments?.length || 0}</div>
                  </div>
                </motion.div>
              )) : <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px' }}><h3>No liked skills yet</h3></div>
            )
          )}
        </div>
      </div>

      <EditProfileModal isOpen={modals.edit} onClose={() => setModals({...modals, edit: false})} user={user} onUpdate={handleUpdateProfile} />
      <SettingsModal isOpen={modals.settings} onClose={() => setModals({...modals, settings: false})} logout={logout} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <ConnectionsModal isOpen={modals.connections} onClose={() => setModals({...modals, connections: false})} title={connectionTitle} users={connectionUsers} />
    </div>
  );
};

export default Profile;
