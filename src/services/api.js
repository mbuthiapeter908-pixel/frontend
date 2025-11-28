import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://backenddeployment-1-wwzi.onrender.com/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error('❌ API Error:', error.response?.data || error.message);
    
    if (error.response?.status === 404) {
      throw new Error('Resource not found');
    } else if (error.response?.status === 500) {
      throw new Error('Server error. Please try again later.');
    } else if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please check your connection.');
    } else {
      throw new Error(error.response?.data?.message || 'Something went wrong');
    }
  }
);

// Jobs API
export const jobsAPI = {
  // Get all jobs with optional filters
  getAll: (params = {}) => api.get(`${API_BASE_URL}/jobs`, { params }),
  
  // Search jobs
  search: (query, params = {}) => api.get(`${API_BASE_URL}/jobs/search`, { 
    params: { q: query, ...params } 
  }),
  
  // Get single job
  getById: (id) => api.get(`${API_BASE_URL}/jobs/${id}`),
  
  // Create new job
  create: (jobData) => api.post(`${API_BASE_URL}/jobs`, jobData),
  
  // Update job
  update: (id, jobData) => api.put(`${API_BASE_URL}/jobs/${id}`, jobData),
  
  // Delete job
  delete: (id) => api.delete(`${API_BASE_URL}/jobs/${id}`),
  
  // Get job statistics
  getStats: () => api.get(`${API_BASE_URL}/jobs/stats/count`),
};

// Employers API
export const employersAPI = {
  // Get all employers
  getAll: (params = {}) => api.get(`${API_BASE_URL}/employers`, { params }),
  
  // Get single employer
  getById: (id) => api.get(`${API_BASE_URL}/employers/${id}`),
  
  // Get jobs by employer
  getJobs: (id, params = {}) => api.get(`${API_BASE_URL}/employers/${id}/jobs`, { params }),
  
  // Create new employer
  create: (employerData) => api.post(`${API_BASE_URL}/employers`, employerData),
  
  // Update employer
  update: (id, employerData) => api.put(`${API_BASE_URL}/employers/${id}`, employerData),
  
  // Delete employer
  delete: (id) => api.delete(`${API_BASE_URL}/employers/${id}`),
  
  // Get employer statistics
  getStats: () => api.get(`${API_BASE_URL}/employers/stats/count`),
};

// Categories API
export const categoriesAPI = {
  // Get all categories with counts
  getAll: () => api.get(`${API_BASE_URL}/categories`),
  
  // Get jobs by category
  getJobs: (categoryName, params = {}) => 
    api.get(`${API_BASE_URL}/categories/${categoryName}/jobs`, { params }),
};

// Health check
export const healthAPI = {
  check: () => api.get(`${API_BASE_URL}/health`),
};

export default api;