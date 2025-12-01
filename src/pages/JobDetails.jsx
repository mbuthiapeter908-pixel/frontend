import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Clock, Building2, DollarSign, ArrowLeft, Share2, Heart, Users, Calendar, CheckCircle } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import Button from '../components/UI/Button';
import Badge from '../components/UI/Badge';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import ApplyModal from '../components/Applications/ApplyModal';
import { useJob } from '../hooks/useJobs';
import { useApplications } from '../hooks/useApplications';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isSignedIn } = useUser();
  const { job, loading, error } = useJob(id);
  const { applyForJob, hasAppliedToJob } = useApplications();
  
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applying, setApplying] = useState(false);

  const handleQuickApply = async () => {
    if (!isSignedIn) {
      // Redirect to sign in
      navigate('/sign-in');
      return;
    }
    
    setApplying(true);
    try {
      await applyForJob(job._id, {
        coverLetter: `I'm excited to apply for the ${job.title} position at ${job.company}. I believe my skills and experience make me a great fit for this role.`
      });
      // Success handled in the hook
    } catch (error) {
      console.error('Application failed:', error);
    } finally {
      setApplying(false);
    }
  };

  const handleApplyWithModal = () => {
    if (!isSignedIn) {
      navigate('/sign-in');
      return;
    }
    setShowApplyModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="text-center bg-white rounded-3xl p-12 shadow-2xl border border-gray-200 max-w-md mx-4">
          <div className="text-8xl mb-6">😞</div>
          <div className="text-3xl font-black text-gray-900 mb-4">Job Not Found</div>
          <div className="text-gray-600 text-lg mb-8">
            {error || 'The job you\'re looking for doesn\'t exist.'}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/jobs">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Jobs
              </Button>
            </Link>
            <Button 
              variant="secondary" 
              onClick={() => navigate(-1)}
              className="border-2 border-gray-300 hover:border-gray-400"
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const hasApplied = hasAppliedToJob(job._id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      {/* Apply Modal */}
      <ApplyModal
        job={job}
        isOpen={showApplyModal}
        onClose={() => setShowApplyModal(false)}
        onApply={applyForJob}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link to="/jobs" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 group font-semibold">
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to All Jobs
        </Link>

        {/* Job Header */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-6 mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center border border-gray-200">
                  <Building2 className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-4xl font-black text-gray-900 mb-3">{job.title}</h1>
                  <p className="text-2xl text-blue-600 font-bold">{job.company}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center text-gray-700 bg-blue-50 px-4 py-2 rounded-xl">
                  <MapPin className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="font-semibold">{job.location}</span>
                  {job.isRemote && (
                    <Badge variant="success" className="ml-3 bg-green-100 text-green-700">
                      Remote
                    </Badge>
                  )}
                </div>
                <div className="flex items-center text-gray-700 bg-purple-50 px-4 py-2 rounded-xl">
                  <Clock className="h-5 w-5 text-purple-600 mr-3" />
                  <span className="font-semibold">{job.type}</span>
                </div>
                <div className="flex items-center text-gray-700 bg-green-50 px-4 py-2 rounded-xl">
                  <DollarSign className="h-5 w-5 text-green-600 mr-3" />
                  <span className="font-semibold">{job.salary}</span>
                </div>
                <div className="flex items-center text-gray-700 bg-orange-50 px-4 py-2 rounded-xl">
                  <Calendar className="h-5 w-5 text-orange-600 mr-3" />
                  <span className="font-semibold">Posted {job.postedDate}</span>
                </div>
              </div>

              {job.isFeatured && (
                <Badge variant="primary" className="bg-yellow-100 text-yellow-700 border border-yellow-200">
                  ⭐ Featured Opportunity
                </Badge>
              )}
            </div>

            <div className="flex lg:flex-col gap-4 lg:min-w-48">
              {hasApplied ? (
                <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-3 rounded-xl font-semibold">
                  <CheckCircle className="h-5 w-5" />
                  Applied
                </div>
              ) : (
                <>
                  <Button 
                    variant="primary" 
                    size="lg" 
                    className="flex-1 lg:flex-none bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl"
                    onClick={handleQuickApply}
                    disabled={applying}
                  >
                    {applying ? 'Applying...' : '⚡ Quick Apply'}
                  </Button>
                  <Button 
                    variant="secondary" 
                    className="flex-1 lg:flex-none border-2 border-gray-300 hover:border-gray-400"
                    onClick={handleApplyWithModal}
                  >
                    Detailed Apply
                  </Button>
                </>
              )}
              <Button variant="ghost" className="flex-1 lg:flex-none text-gray-600 hover:bg-gray-100">
                <Heart className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button variant="ghost" className="flex-1 lg:flex-none text-gray-600 hover:bg-gray-100">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>

        {/* Rest of the job details content remains the same */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Description */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8">
              <h2 className="text-3xl font-black text-gray-900 mb-6">Job Description</h2>
              <p className="text-gray-700 leading-relaxed text-lg">{job.description}</p>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8">
              <h2 className="text-3xl font-black text-gray-900 mb-6">Requirements</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {job.requirements.map((requirement, index) => (
                  <div key={index} className="flex items-center text-gray-700 bg-gray-50 p-4 rounded-2xl">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-4"></div>
                    <span className="font-semibold">{requirement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Company Info */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6">
              <h3 className="text-xl font-black text-gray-900 mb-4">About {job.company}</h3>
              <p className="text-gray-600 text-sm mb-4">
                A leading company in their industry, focused on innovation and growth.
              </p>
              <div className="flex items-center text-gray-600 text-sm bg-blue-50 p-3 rounded-xl">
                <Users className="h-4 w-4 text-blue-600 mr-2" />
                <span className="font-semibold">Growing team</span>
              </div>
            </div>

            {/* Application Stats */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-6 text-white shadow-2xl">
              <h3 className="text-xl font-black mb-3">
                {hasApplied ? 'Application Submitted!' : 'Ready to Apply?'}
              </h3>
              <p className="text-blue-100 text-sm mb-6">
                {hasApplied 
                  ? 'Your application has been received. The employer will review it soon.'
                  : 'This position receives many applications. Stand out with your unique profile!'
                }
              </p>
              {!hasApplied && (
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="w-full font-bold"
                  onClick={handleApplyWithModal}
                >
                  {isSignedIn ? 'Apply Now' : 'Sign In to Apply'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;