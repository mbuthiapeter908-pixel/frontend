import React, { useState } from 'react';
import { Building2, Users, Target, Star, CheckCircle, Rocket, Zap, TrendingUp, Crown, Plus, ArrowRight, Shield, Clock, Heart, Sparkles, Award, Trophy, TrendingUp as TrendingUpIcon, Globe, Users as UsersIcon, Zap as ZapIcon } from 'lucide-react';
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

  // Enhanced features with more vibrant descriptions
  const features = [
    {
      icon: <Rocket className="h-10 w-10" />,
      title: "Rocket-Fast Hiring",
      description: "Post jobs and get applications from qualified youth in hours, not weeks",
      color: "from-purple-500 via-pink-500 to-red-500",
      bgColor: "from-purple-50 via-pink-50 to-red-50",
      emoji: "🚀",
      highlight: "10x faster than traditional methods"
    },
    {
      icon: <Target className="h-10 w-10" />,
      title: "Precision AI Matching",
      description: "Our AI instantly connects you with perfect candidates who match your needs",
      color: "from-blue-500 via-cyan-500 to-emerald-500",
      bgColor: "from-blue-50 via-cyan-50 to-emerald-50",
      emoji: "🎯",
      highlight: "95% match accuracy"
    },
    {
      icon: <Crown className="h-10 w-10" />,
      title: "Top Youth Talent",
      description: "Access the most motivated, skilled, and innovative young professionals",
      color: "from-yellow-400 via-orange-500 to-red-500",
      bgColor: "from-yellow-50 via-orange-50 to-red-50",
      emoji: "👑",
      highlight: "75K+ successful hires"
    },
    {
      icon: <Shield className="h-10 w-10" />,
      title: "Verified Excellence",
      description: "Every candidate is pre-vetted, verified, and ready to contribute immediately",
      color: "from-green-500 via-emerald-500 to-teal-500",
      bgColor: "from-green-50 via-emerald-50 to-teal-50",
      emoji: "🛡️",
      highlight: "100% verified profiles"
    },
    {
      icon: <Zap className="h-10 w-10" />,
      title: "Lightning Tools",
      description: "Automated scheduling, one-click interviews, and smart communication tools",
      color: "from-indigo-500 via-purple-500 to-pink-500",
      bgColor: "from-indigo-50 via-purple-50 to-pink-50",
      emoji: "⚡",
      highlight: "Save 15+ hours weekly"
    },
    {
      icon: <Heart className="h-10 w-10" />,
      title: "24/7 Premium Support",
      description: "Dedicated success managers and round-the-clock expert assistance",
      color: "from-pink-500 via-rose-500 to-red-500",
      bgColor: "from-pink-50 via-rose-50 to-red-50",
      emoji: "❤️",
      highlight: "4.9/5 satisfaction"
    }
  ];

  // Enhanced stats with animations
  const stats = [
    { 
      number: "85%", 
      label: "Faster Hiring", 
      description: "Reduced time-to-hire", 
      icon: "⚡",
      gradient: "from-yellow-400 to-orange-500"
    },
    { 
      number: "4.9/5", 
      label: "Employer Rating", 
      description: "Top-rated platform", 
      icon: "⭐",
      gradient: "from-blue-400 to-purple-500"
    },
    { 
      number: "24h", 
      label: "Avg Response", 
      description: "Candidate replies", 
      icon: "🚀",
      gradient: "from-green-400 to-emerald-500"
    },
    { 
      number: "10K+", 
      label: "Active Talent", 
      description: "Ready to work", 
      icon: "👥",
      gradient: "from-pink-400 to-rose-500"
    }
  ];

  // Enhanced benefits
  const benefits = [
    "🚀 Post unlimited job listings for free",
    "🎯 AI-powered precision matching",
    "⚡ One-click candidate communication",
    "💼 Beautiful, customizable company profiles",
    "📊 Real-time analytics & insights dashboard",
    "🎨 Brand amplification to 100K+ youth",
    "📧 Automated interview scheduling",
    "🔔 Smart talent pool notifications",
    "🏆 Premium verification badge",
    "👑 Priority customer support",
    "🌍 Global reach, local talent",
    "✨ No credit card required"
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

  // Floating "Post Job" button for constant visibility
  const FloatingPostButton = () => (
    <div className="fixed bottom-8 right-8 z-40 animate-bounce">
      <Button
        size="lg"
        onClick={() => setShowJobForm(true)}
        className="shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white border-0"
      >
        <Plus className="h-6 w-6 mr-2 animate-pulse" />
        🚀 POST JOB NOW
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-blue-50 to-purple-50">
      {/* Floating Post Button - ALWAYS VISIBLE */}
      <FloatingPostButton />

      {/* Job Posting Modal */}
      {showJobForm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-lg z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-purple-200">
            {/* Animated header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-t-3xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-xl">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-black text-white">Post Your Dream Job</h2>
                </div>
                <button
                  onClick={() => setShowJobForm(false)}
                  className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                >
                  ✕
                </button>
              </div>
              <p className="text-purple-100 text-sm mt-2">Find your next rockstar hire in minutes!</p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2 flex items-center">
                    <Sparkles className="h-3 w-3 mr-2 text-purple-500" />
                    Job Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all hover:border-purple-300"
                    placeholder="✨ e.g., Frontend Developer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2 flex items-center">
                    <Building2 className="h-3 w-3 mr-2 text-blue-500" />
                    Company *
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-300"
                    placeholder="🏢 Your company name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2 flex items-center">
                    <Globe className="h-3 w-3 mr-2 text-green-500" />
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all hover:border-green-300"
                    placeholder="📍 e.g., Remote, San Francisco, CA"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2 flex items-center">
                    <TrendingUpIcon className="h-3 w-3 mr-2 text-yellow-500" />
                    Salary Range *
                  </label>
                  <input
                    type="text"
                    name="salary"
                    value={formData.salary}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all hover:border-yellow-300"
                    placeholder="💰 e.g., $80,000 - $100,000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2 flex items-center">
                    <Clock className="h-3 w-3 mr-2 text-indigo-500" />
                    Job Type *
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all hover:border-indigo-300"
                  >
                    {jobTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2 flex items-center">
                    <Target className="h-3 w-3 mr-2 text-red-500" />
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all hover:border-red-300"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2 flex items-center">
                  <FileText className="h-3 w-3 mr-2 text-cyan-500" />
                  Job Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all hover:border-cyan-300"
                  placeholder="📝 Describe the role, responsibilities, and what makes your company amazing..."
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2 flex items-center">
                  <CheckCircle className="h-3 w-3 mr-2 text-emerald-500" />
                  Requirements *
                </label>
                <div className="space-y-3">
                  {formData.requirements.map((requirement, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center justify-center text-xs">
                        {index + 1}
                      </div>
                      <input
                        type="text"
                        value={requirement}
                        onChange={(e) => handleRequirementChange(index, e.target.value)}
                        required
                        className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all hover:border-emerald-300"
                        placeholder={`Skill/requirement ${index + 1}`}
                      />
                      {formData.requirements.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeRequirement(index)}
                          className="px-3 py-3 bg-gradient-to-r from-red-100 to-pink-100 text-red-600 rounded-xl hover:from-red-200 hover:to-pink-200 transition-all border border-red-200"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addRequirement}
                    className="flex items-center gap-2 px-4 py-3 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-all font-medium border-2 border-dashed border-blue-200 hover:border-blue-300"
                  >
                    <Plus className="h-4 w-4" />
                    Add Another Requirement
                  </button>
                </div>
              </div>

              <div className="flex gap-6">
                <label className="flex items-center gap-3 p-3 rounded-xl hover:bg-purple-50 transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    name="isRemote"
                    checked={formData.isRemote}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 h-5 w-5"
                  />
                  <div>
                    <span className="font-bold text-gray-800">🌍 Remote Position</span>
                    <p className="text-gray-600 text-sm">Can be done from anywhere</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-xl hover:bg-yellow-50 transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500 h-5 w-5"
                  />
                  <div>
                    <span className="font-bold text-gray-800">⭐ Featured Job</span>
                    <p className="text-gray-600 text-sm">Get 3x more visibility</p>
                  </div>
                </label>
              </div>

              <div className="flex gap-4 pt-6 border-t border-gray-200">
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 text-lg py-4 shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Posting Your Job...
                    </>
                  ) : (
                    '🚀 Launch Job Posting'
                  )}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setShowJobForm(false)}
                  className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900"
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
        <div className="fixed top-4 right-4 z-50 animate-fade-in-down">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
            <CheckCircle className="h-6 w-6 animate-pulse" />
            <div>
              <span className="font-bold text-lg">🎉 Job Posted Successfully!</span>
              <p className="text-green-100 text-sm">Your job is now live and visible to thousands of candidates!</p>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section - Enhanced */}
      <section className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white py-24 overflow-hidden">
        {/* Animated Background Particles */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10"></div>
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Premium Badge */}
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400/20 to-orange-500/20 backdrop-blur-sm border border-yellow-400/30 mb-8 animate-pulse">
            <Trophy className="h-5 w-5 text-yellow-300 mr-2" />
            <span className="text-lg font-bold bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              🏆 #1 Youth Hiring Platform 2024
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent animate-gradient">
              Hire
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-300 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">
              Tomorrow's
            </span>
            <br />
            <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent">
              Leaders
            </span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-purple-200 mb-10 max-w-3xl mx-auto leading-relaxed font-medium">
            Connect with <span className="font-bold text-white">brilliant young talent</span> ready to bring 
            <span className="text-yellow-300"> innovation</span>, <span className="text-cyan-300">energy</span>, and 
            <span className="text-green-300"> fresh ideas</span> to your team. 🚀
          </p>

          {/* Mega CTA Button */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">
            <Button 
              size="xl" 
              onClick={() => setShowJobForm(true)}
              className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 text-white font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 border-0 text-2xl px-12 py-6 rounded-2xl animate-pulse-slow"
            >
              <Sparkles className="h-7 w-7 mr-3" />
              🚀 POST YOUR FIRST JOB - FREE!
              <ArrowRight className="h-7 w-7 ml-3 group-hover:translate-x-2 transition-transform" />
            </Button>
            
            <Button 
              size="xl" 
              variant="ghost"
              className="text-white border-2 border-white/30 hover:border-white hover:bg-white/10 font-bold text-xl px-10 py-5 rounded-2xl backdrop-blur-sm"
            >
              <Crown className="h-6 w-6 mr-2" />
              👑 SEE PREMIUM FEATURES
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 items-center">
            {['Google', 'Microsoft', 'Amazon', 'Spotify', 'Netflix', 'Airbnb'].map((company, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-2xl">🏢</div>
                </div>
                <span className="text-gray-300 text-sm font-medium">{company}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Enhanced */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center group p-8 rounded-3xl bg-white border-2 border-transparent hover:border-purple-200 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className={`text-5xl mb-4 group-hover:scale-110 transition-transform duration-300 animate-bounce`}>
                  {stat.icon}
                </div>
                <div className={`text-5xl md:text-6xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2 group-hover:scale-105 transition-transform duration-300`}>
                  {stat.number}
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">{stat.label}</div>
                <div className="text-gray-600 font-medium">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-purple-400 to-pink-400 blur-3xl"
              style={{
                width: `${200 + Math.random() * 300}px`,
                height: `${200 + Math.random() * 300}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${15 + Math.random() * 10}s infinite ease-in-out`,
                animationDelay: `${Math.random() * 5}s`
              }}
            ></div>
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 border-2 border-blue-200 mb-8">
              <Award className="h-6 w-6 text-purple-600 mr-3" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Why 5,000+ Companies Choose JobHub
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-8">
              Built for <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Employer Success</span>
            </h2>
            <p className="text-2xl text-gray-700 max-w-3xl mx-auto font-medium">
              We've engineered the most advanced platform to connect you with exceptional young talent
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition duration-700 group-hover:duration-300"></div>
                <div className="relative bg-white p-10 rounded-3xl border-4 border-white hover:border-transparent shadow-2xl hover:shadow-3xl transition-all duration-500 group-hover:scale-105">
                  <div className="relative mb-8">
                    <div className={`w-20 h-20 rounded-3xl bg-gradient-to-r ${feature.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                      <div className={`bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                        {feature.icon}
                      </div>
                    </div>
                    <div className="absolute -top-3 -right-3 text-3xl animate-bounce">
                      {feature.emoji}
                    </div>
                  </div>
                  <h3 className="text-3xl font-black text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg mb-4">
                    {feature.description}
                  </p>
                  <div className="inline-block px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full text-sm font-bold text-gray-700">
                    {feature.highlight}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mini CTA */}
          <div className="text-center">
            <Button
              size="xl"
              onClick={() => setShowJobForm(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 text-2xl px-16 py-6 rounded-2xl"
            >
              <Rocket className="h-7 w-7 mr-3" />
              🎯 START HIRING TODAY
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA Section - Mega */}
      <section className="py-24 bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 relative overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 animate-gradient-x"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-xl rounded-4xl p-12 md:p-16 shadow-3xl border-2 border-white/20">
            <div className="inline-flex items-center px-8 py-4 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-8">
              <Sparkles className="h-6 w-6 text-white mr-3" />
              <span className="text-xl font-bold text-white">Limited Time Offer</span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8">
              Ready to Transform<br />
              <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent">
                Your Hiring Process?
              </span>
            </h2>
            
            <p className="text-2xl text-purple-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of innovative companies already finding exceptional talent on JobHub
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {benefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className="flex items-center text-white bg-white/10 backdrop-blur-sm p-5 rounded-2xl border border-white/20 hover:bg-white/20 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-bold text-lg">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Final Mega CTA Button */}
            <div className="space-y-6">
              <Button
                size="xxl"
                onClick={() => setShowJobForm(true)}
                className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:from-yellow-500 hover:via-orange-600 hover:to-red-600 font-black shadow-3xl hover:shadow-4xl transform hover:scale-105 transition-all duration-300 text-3xl px-20 py-8 rounded-3xl border-0 animate-pulse-slow"
              >
                <div className="flex items-center justify-center gap-4">
                  <Rocket className="h-10 w-10" />
                  <span>🚀 LAUNCH FREE ACCOUNT NOW</span>
                  <ArrowRight className="h-10 w-10" />
                </div>
              </Button>
              
              <p className="text-white/80 text-lg">
                ✨ No credit card required • Setup in 60 seconds • First job post FREE
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Employers;