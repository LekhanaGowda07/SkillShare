import React, { useState, useEffect } from 'react';
import { notificationsAPI } from '../api';
import { motion } from 'framer-motion';
import { Bell, Heart, MessageCircle, Info } from 'lucide-react';
import './Notifications.css';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await notificationsAPI.getAll();
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'like': return <Heart size={20} className="notif-icon like" fill="#ff3040" />;
      case 'comment': return <MessageCircle size={20} className="notif-icon comment" fill="#0095f6" />;
      default: return <Bell size={20} className="notif-icon system" />;
    }
  };

  return (
    <div className="notifications-page">
      <div className="notif-header">
        <h1>Notifications</h1>
      </div>

      <div className="notif-list">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : notifications.length > 0 ? (
          notifications.map((notif, index) => (
            <motion.div 
              key={notif._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="notif-item glass"
            >
              <div className="notif-icon-wrapper">
                {getIcon(notif.type)}
              </div>
              <div className="notif-content">
                <p>{notif.message}</p>
                <span className="notif-time">{new Date(notif.createdAt).toLocaleString()}</span>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="empty-notif">
            <Info size={48} />
            <p>No new notifications</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
