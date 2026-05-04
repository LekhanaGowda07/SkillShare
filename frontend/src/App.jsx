import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Create from './pages/Create';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import Trending from './pages/Trending';
import { useAuth } from './context/AuthContext';
import './index.css';

function App() {
  const { user, loading } = useAuth();

  if (loading) return <div className="loading-screen">Loading...</div>;

  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={user ? <Create /> : <Navigate to="/login" />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
            <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/trending" element={<Trending />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
