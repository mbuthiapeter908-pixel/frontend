import axios from 'axios';

// Base API URL for frontend
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'https://backenddeployment-1-wwzi.onrender.com/api';

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
    console.log(`🚀 ${config.method?.toUpperCase()} → ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('❌ API Error:', error.response?.data || error.message);

    const status = error.response?.status;

    if (status === 404) {
      throw new Error('Resource not found');
    } else if (status === 500) {
      throw new Error('Server error. Please try again later.');
    } else if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please check your connection.');
    } else {
      throw new Error(error.response?.data?.message || 'Something went wrong');
    }
  }
);

/* ===========================
        JOBS API
=========================== */
export const jobsAPI = {
  getAll: (params = {}) => api.get('/jobs', { params }),
  search: (query, params = {}) =>
    api.get('/jobs/search', { params: { q: query, ...params } }),
  getById: (id) => api.get(`/jobs/${id}`),
  create: (jobData) => api.post('/jobs', jobData),
  update: (id, jobData) => api.put(`/jobs/${id}`, jobData),
  delete: (id) => api.delete(`/jobs/${id}`),
  getStats: () => api.get('/jobs/stats/count'),
};

/* ===========================
      EMPLOYERS API
=========================== */
export const employersAPI = {
  getAll: (params = {}) => api.get('/employers', { params }),
  getById: (id) => api.get(`/employers/${id}`),
  getJobs: (id, params = {}) => api.get(`/employers/${id}/jobs`, { params }),
  create: (employerData) => api.post('/employers', employerData),
  update: (id, employerData) => api.put(`/employers/${id}`, employerData),
  delete: (id) => api.delete(`/employers/${id}`),
  getStats: () => api.get('/employers/stats/count'),
};

/* ===========================
     CATEGORIES API
=========================== */
export const categoriesAPI = {
  getAll: () => api.get('/categories'),
  getJobs: (categoryName, params = {}) =>
    api.get(`/categories/${categoryName}/jobs`, { params }),
};

/* ===========================
      HEALTH CHECK API
=========================== */
export const healthAPI = {
  check: () => api.get('/health'),
};

export default api;
