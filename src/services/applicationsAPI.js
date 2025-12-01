import api from './api.js';

export const applicationsAPI = {
  // Apply for a job
  apply: (applicationData) => api.post('/applications', applicationData),
  
  // Get user's applications
  getUserApplications: (clerkUserId, params = {}) => 
    api.get(`/applications/user/${clerkUserId}`, { params }),
  
  // Get applications for a job (employer)
  getJobApplications: (jobId, params = {}) => 
    api.get(`/applications/job/${jobId}`, { params }),
  
  // Update application status
  updateStatus: (applicationId, statusData) => 
    api.put(`/applications/${applicationId}/status`, statusData)
};