import api from './api.js';

export const contactAPI = {
  // Submit contact form
  submit: (contactData) => api.post('/contact', contactData),
  
  // Get user's contact inquiries
  getUserContacts: (userId, params = {}) => 
    api.get(`/contact/user/${userId}`, { params }),
  
  // Get contact statistics
  getStats: () => api.get('/contact/stats')
};