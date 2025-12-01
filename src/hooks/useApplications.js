import { useState, useEffect } from 'react';
import { applicationsAPI } from '../services/applicationsAPI';
import { useUser } from '@clerk/clerk-react';

export const useApplications = () => {
  const { user } = useUser();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchApplications = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await applicationsAPI.getUserApplications(user.id);
      setApplications(response.data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching applications:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [user]);

  const applyForJob = async (jobId, applicationData = {}) => {
    try {
      setLoading(true);
      setError(null);

      const data = {
        clerkUserId: user.id,
        jobId,
        coverLetter: applicationData.coverLetter || '',
        resumeUrl: applicationData.resumeUrl || '',
        notes: applicationData.notes || ''
      };

      const response = await applicationsAPI.apply(data);
      
      // Refresh applications list
      await fetchApplications();
      
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const hasAppliedToJob = (jobId) => {
    return applications.some(app => app.jobId._id === jobId);
  };

  return {
    applications,
    loading,
    error,
    applyForJob,
    hasAppliedToJob,
    refetch: fetchApplications
  };
};