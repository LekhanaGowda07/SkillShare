import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the auth token to every request
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Skills API calls
export const skillsAPI = {
  getAll: (search = '', category = '') =>
    api.get('/skills', { params: { search, category } }),
  getById: (id) => api.get(`/skills/${id}`),
  getTrending: () => api.get('/skills/trending'),
  create: (data) => api.post('/skills', data),
  update: (id, data) => api.put(`/skills/${id}`, data),
  delete: (id) => api.delete(`/skills/${id}`),
  like: (id) => api.post(`/skills/${id}/like`),
  comment: (id, data) => api.post(`/skills/${id}/comment`, data),
};

// Notifications API calls
export const notificationsAPI = {
  getAll: () => api.get('/notifications'),
  getById: (id) => api.get(`/notifications/${id}`),
  create: (data) => api.post('/notifications', data),
  update: (id, data) => api.put(`/notifications/${id}`, data),
  delete: (id) => api.delete(`/notifications/${id}`),
};

// User API calls
export const userAPI = {
  getMe: () => api.get('/users/me'),
  updateProfile: (data) => api.put('/users/profile', data),
  follow: (id) => api.post(`/users/follow/${id}`),
  unfollow: (id) => api.post(`/users/unfollow/${id}`),
  getStats: (id) => api.get(`/users/stats/${id}`),
  getFollowing: () => api.get('/users/following'),
  getFollowersList: (id) => api.get(`/users/followers/list/${id}`),
  getFollowingList: (id) => api.get(`/users/following/list/${id}`),
};

export default api;
