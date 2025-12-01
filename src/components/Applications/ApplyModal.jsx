import React, { useState } from 'react';
import { X, Upload, FileText } from 'lucide-react';
import Button from '../UI/Button';

const ApplyModal = ({ job, isOpen, onClose, onApply }) => {
  const [formData, setFormData] = useState({
    coverLetter: '',
    notes: ''
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // In a real app, you'd upload the resume file first
      const resumeUrl = resumeFile ? await uploadResume(resumeFile) : '';
      
      await onApply(job._id, {
        ...formData,
        resumeUrl
      });
      
      onClose();
      resetForm();
    } catch (error) {
      console.error('Application error:', error);
    } finally {
      setLoading(false);
    }
  };

  const uploadResume = async (file) => {
    // Simulate file upload - replace with actual upload service
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`https://example.com/resumes/${file.name}`);
      }, 1000);
    });
  };

  const resetForm = () => {
    setFormData({ coverLetter: '', notes: '' });
    setResumeFile(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setResumeFile(file);
    } else {
      alert('Please upload a PDF file');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-black text-gray-900">Apply for Position</h2>
            <p className="text-gray-600 mt-1">{job.title} at {job.company}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Resume Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Resume (PDF)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-blue-400 transition-colors">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
                id="resume-upload"
              />
              <label htmlFor="resume-upload" className="cursor-pointer">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 font-medium">
                  {resumeFile ? resumeFile.name : 'Click to upload your resume'}
                </p>
                <p className="text-gray-500 text-sm mt-1">PDF format only</p>
              </label>
            </div>
          </div>

          {/* Cover Letter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Cover Letter
            </label>
            <textarea
              value={formData.coverLetter}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                coverLetter: e.target.value 
              }))}
              rows="4"
              placeholder="Tell the employer why you're a great fit for this position..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
            />
            <p className="text-gray-500 text-sm mt-2">
              {formData.coverLetter.length}/1000 characters
            </p>
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Additional Notes (Optional)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                notes: e.target.value 
              }))}
              rows="2"
              placeholder="Any additional information you'd like to share..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6 border-t border-gray-200">
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Applying...' : '🚀 Submit Application'}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              className="border-2 border-gray-300 hover:border-gray-400"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyModal;