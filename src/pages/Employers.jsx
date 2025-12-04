import React, { useState } from 'react';
import { Building2, Users, Target, Star, CheckCircle, Rocket, Zap, TrendingUp, Crown, Plus, ArrowRight, Shield, Clock, Heart } from 'lucide-react';
import Button from '../components/UI/Button';
import { employersAPI, jobsAPI } from '../services/api';

const Employers = () => {
  const [showJobForm, setShowJobForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full-time',
    category: 'Technology',
    salary: '',
    description: '',
    requirements: [''],
    isRemote: false,
    isFeatured: false,
    employerId: 'employer_demo_001' // Demo employer ID
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const features = [
    {
      icon: <Rocket className="h-8 w-8" />,
      title: "Rocket-Fast Hiring",
      description: "Post jobs and get applications from qualified youth in hours, not weeks",
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-50 to-pink-50",
      emoji: "🚀"
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Precision Matching",
      description: "AI-powered matching connects you with perfect candidates instantly",
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50",
      emoji: "🎯"
    },
    {
      icon: <Crown className="h-8 w-8" />,
      title: "Top Youth Talent",
      description: "Access the most motivated and skilled young professionals",
      color: "from-yellow-500 to-orange-500",
      bgColor: "from-yellow-50 to-orange-50",
      emoji: "👑"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Verified Profiles",
      description: "All candidates are verified and pre-screened for quality",
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50",
      emoji: "🛡️"
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Time Saving Tools",
      description: "Automated scheduling and communication tools",
      color: "from-indigo-500 to-purple-500",
      bgColor: "from-indigo-50 to-purple-50",
      emoji: "⏰"
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Dedicated Support",
      description: "24/7 support from our dedicated team",
      color: "from-pink-500 to-rose-500",
      bgColor: "from-pink-50 to-rose-50",
      emoji: "❤️"
    }
  ];

  const stats = [
    { number: "85%", label: "Faster Hiring", description: "Compared to traditional methods", icon: "⚡" },
    { number: "4.9/5", label: "Employer Rating", description: "From amazing companies", icon: "⭐" },
    { number: "24h", label: "Average Response", description: "To job applications", icon: "🚀" },
    { number: "10K+", label: "Active Candidates", description: "Ready to work", icon: "👥" }
  ];

  const benefits = [
    "🚀 Post unlimited job listings",
    "🎯 Access to premium candidate profiles",
    "⚡ Advanced AI filtering",
    "💼 Beautiful company profile page",
    "📊 Real-time analytics dashboard",
    "🎨 Brand promotion to youth",
    "📧 Automated candidate communication",
    "🔔 Smart job alerts"
  ];

  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Temporary'];
  const categories = ['Technology', 'Design', 'Marketing', 'Sales', 'Business', 'Customer Service', 'Healthcare', 'Education', 'Engineering', 'Finance'];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRequirementChange = (index, value) => {
    const newRequirements = [...formData.requirements];
    newRequirements[index] = value;
    setFormData(prev => ({
      ...prev,
      requirements: newRequirements
    }));
  };

  const addRequirement = () => {
    setFormData(prev => ({
      ...prev,
      requirements: [...prev.requirements, '']
    }));
  };

  const removeRequirement = (index) => {
    if (formData.requirements.length > 1) {
      const newRequirements = formData.requirements.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        requirements: newRequirements
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Filter out empty requirements
      const filteredRequirements = formData.requirements.filter(req => req.trim() !== '');
      
      const jobData = {
        ...formData,
        requirements: filteredRequirements
      };

      await jobsAPI.create(jobData);
      setSuccess(true);
      setFormData({
        title: '',
        company: '',
        location: '',
        type: 'Full-time',
        category: 'Technology',
        salary: '',
        description: '',
        requirements: [''],
        isRemote: false,
        isFeatured: false,
        employerId: 'employer_demo_001'
      });
      
      setTimeout(() => {
        setSuccess(false);
        setShowJobForm(false);
      }, 3000);
      
    } catch (error) {
      console.error('Error posting job:', error);
      alert('Failed to post job. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Job Posting Modal */}
      {showJobForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black text-gray-900">Post a New Job</h2>
                <button
                  onClick={() => setShowJobForm(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="e.g., Frontend Developer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Company *
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Your company name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="e.g., Remote, San Francisco, CA"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Salary Range *
                  </label>
                  <input
                    type="text"
                    name="salary"
                    value={formData.salary}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="e.g., $80,000 - $100,000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Job Type *
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  >
                    {jobTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Job Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Describe the role, responsibilities, and what makes your company great..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Requirements *
                </label>
                <div className="space-y-2">
                  {formData.requirements.map((requirement, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={requirement}
                        onChange={(e) => handleRequirementChange(index, e.target.value)}
                        required
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder={`Requirement ${index + 1}`}
                      />
                      {formData.requirements.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeRequirement(index)}
                          className="px-4 py-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addRequirement}
                    className="flex items-center gap-2 px-4 py-3 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    Add Requirement
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="isRemote"
                    checked={formData.isRemote}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-semibold text-gray-700">Remote Position</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-semibold text-gray-700">Featured Job</span>
                </label>
              </div>

              <div className="flex gap-4 pt-6 border-t border-gray-200">
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Posting Job...' : '🚀 Post Job'}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setShowJobForm(false)}
                  className="border-2 border-gray-300 hover:border-gray-400"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl z-50 animate-fade-in-up">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            <span className="font-semibold">Job posted successfully!</span>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white py-20 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-75"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
            <Crown className="h-5 w-5 text-yellow-300 mr-2" />
            <span className="text-lg font-semibold text-white">Trusted by 5,000+ Amazing Companies</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6">
            Find Your Next
            <span className="block bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
              Rockstar Hire
            </span>
          </h1>
          <p className="text-xl text-purple-200 mb-8 max-w-2xl mx-auto font-medium">
            Connect with brilliant young talent ready to bring innovation, energy, and fresh ideas to your team. 🚀
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary" 
              className="bg-white text-purple-600 hover:bg-gray-100 font-bold shadow-2xl hover:scale-105 transition-transform"
              onClick={() => setShowJobForm(true)}
            >
              <Plus className="h-5 w-5 mr-2" />
              🎯 Post a Job - It's Free!
            </Button>
            <Button 
              size="lg" 
              variant="ghost" 
              className="text-white border-white hover:bg-white/10 font-bold"
            >
              👑 See Premium Features
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2 group-hover:scale-105 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-xl font-bold text-gray-900 mb-2">{stat.label}</div>
                <div className="text-gray-600 font-medium">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Why <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">JobHub</span> for Employers? 🎯
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto font-medium">
              We've built the most effective platform to connect you with amazing young talent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-white p-8 rounded-3xl border-2 border-gray-100 hover:border-transparent shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:scale-105">
                  <div className="relative mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <div className={`bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                        {feature.icon}
                      </div>
                    </div>
                    <div className="absolute -top-2 -right-2 text-2xl">
                      {feature.emoji}
                    </div>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed font-medium">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Ready to Find Amazing Talent? 🚀
            </h2>
            <p className="text-xl text-gray-600 mb-8 font-medium">
              Join thousands of forward-thinking companies already hiring brilliant youth on JobHub.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center text-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-2xl">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="font-semibold">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 font-bold shadow-lg hover:shadow-xl"
                onClick={() => setShowJobForm(true)}
              >
                <Building2 className="h-5 w-5 mr-2" />
                🎯 Post Your First Job
              </Button>
              <Button 
                variant="secondary" 
                size="lg" 
                className="border-2 border-blue-200 hover:border-blue-300 font-bold"
              >
                💼 Schedule Demo
              </Button>
            </div>

            <p className="text-gray-500 text-sm mt-6">
              ✨ No credit card required • Free forever plan available • Setup in 2 minutes
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Employers;