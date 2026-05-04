import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, PlusSquare, Compass, Bell, User, LogOut, Sun, Moon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <header className="header glass">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <span className="logo-icon">🎓</span>
            <span className="logo-text">SkillShare</span>
          </Link>

          <div className="header-actions">
            <button onClick={toggleTheme} className="theme-toggle">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <button
              className="menu-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              ☰
            </button>
          </div>

          <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
            <Link to="/" className="nav-link"><Home size={20} /> <span>Home</span></Link>
            <Link to="/trending" className="nav-link"><Compass size={20} /> <span>Explore</span></Link>
            <Link to="/notifications" className="nav-link"><Bell size={20} /> <span>Notifications</span></Link>
            <Link to="/create" className="nav-link"><PlusSquare size={20} /> <span>Share</span></Link>
            
            {user ? (
              <>
                <Link to="/profile" className="nav-link profile-link">
                  <User size={20} /> <span>Profile</span>
                </Link>
                <button onClick={logout} className="nav-link logout-btn">
                  <LogOut size={20} /> <span>Logout</span>
                </button>
              </>
            ) : (
              <Link to="/login" className="nav-link login-btn">Login</Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
