import React, { useState } from 'react';
import { Building2, Users, Target, Star, CheckCircle, Rocket, Zap, TrendingUp, Crown, Plus, ArrowRight, Shield, Clock, Heart, Sparkles, Award, Globe, TrendingUp as TrendingIcon, Bolt, Users as TeamIcon } from 'lucide-react';
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
    employerId: 'employer_demo_001'
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const features = [
    {
      icon: <Rocket className="h-10 w-10" />,
      title: "Rocket-Fast Hiring",
      description: "Post jobs and get applications from qualified youth in hours, not weeks",
      color: "from-purple-500 to-pink-500",
      gradient: "bg-gradient-to-r from-purple-500 to-pink-500",
      bgColor: "from-purple-50 to-pink-50",
      emoji: "🚀",
      sparkle: true
    },
    {
      icon: <Target className="h-10 w-10" />,
      title: "AI-Powered Matching",
      description: "Smart algorithms connect you with perfect candidates instantly",
      color: "from-blue-500 to-cyan-500",
      gradient: "bg-gradient-to-r from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50",
      emoji: "🤖",
      sparkle: false
    },
    {
      icon: <Crown className="h-10 w-10" />,
      title: "Elite Youth Talent",
      description: "Access the most motivated and skilled young professionals",
      color: "from-yellow-500 to-orange-500",
      gradient: "bg-gradient-to-r from-yellow-500 to-orange-500",
      bgColor: "from-yellow-50 to-orange-50",
      emoji: "👑",
      sparkle: true
    },
    {
      icon: <Shield className="h-10 w-10" />,
      title: "Verified Excellence",
      description: "All candidates are verified and pre-screened for quality",
      color: "from-green-500 to-emerald-500",
      gradient: "bg-gradient-to-r from-green-500 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50",
      emoji: "🛡️",
      sparkle: false
    },
    {
      icon: <Bolt className="h-10 w-10" />,
      title: "Smart Automation",
      description: "Automated scheduling, communication, and screening tools",
      color: "from-indigo-500 to-purple-500",
      gradient: "bg-gradient-to-r from-indigo-500 to-purple-500",
      bgColor: "from-indigo-50 to-purple-50",
      emoji: "⚡",
      sparkle: true
    },
    {
      icon: <TeamIcon className="h-10 w-10" />,
      title: "Dedicated Support",
      description: "24/7 premium support from our dedicated team",
      color: "from-pink-500 to-rose-500",
      gradient: "bg-gradient-to-r from-pink-500 to-rose-500",
      bgColor: "from-pink-50 to-rose-50",
      emoji: "❤️",
      sparkle: false
    }
  ];

  const stats = [
    { 
      number: "85%", 
      label: "Faster Hiring", 
      description: "Compared to traditional methods", 
      icon: <TrendingIcon className="h-6 w-6" />,
      color: "from-green-500 to-emerald-500"
    },
    { 
      number: "4.9/5", 
      label: "Employer Rating", 
      description: "From amazing companies", 
      icon: <Star className="h-6 w-6 fill-current" />,
      color: "from-yellow-500 to-orange-500"
    },
    { 
      number: "24h", 
      label: "Average Response", 
      description: "To job applications", 
      icon: <Clock className="h-6 w-6" />,
      color: "from-blue-500 to-cyan-500"
    },
    { 
      number: "10K+", 
      label: "Active Candidates", 
      description: "Ready to work", 
      icon: <Users className="h-6 w-6" />,
      color: "from-purple-500 to-pink-500"
    }
  ];

  const benefits = [
    { icon: "🚀", text: "Post unlimited job listings" },
    { icon: "🎯", text: "Access to premium candidate profiles" },
    { icon: "⚡", text: "Advanced AI filtering & matching" },
    { icon: "💼", text: "Beautiful company profile page" },
    { icon: "📊", text: "Real-time analytics dashboard" },
    { icon: "🎨", text: "Brand promotion to youth" },
    { icon: "📧", text: "Automated candidate communication" },
    { icon: "🔔", text: "Smart job alerts & notifications" }
  ];

  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Temporary'];
  const categories = ['Technology', 'Design', 'Marketing', 'Sales', 'Business', 'Customer Service', 'Healthcare', 'Education', 'Engineering', 'Finance'];

  const testimonials = [
    {
      name: "TechStart Inc.",
      role: "CEO",
      quote: "Found 3 amazing developers in 48 hours! Game-changing platform.",
      rating: 5
    },
    {
      name: "GrowthLabs",
      role: "HR Director",
      quote: "The quality of youth talent is exceptional. Our go-to hiring platform.",
      rating: 5
    },
    {
      name: "DesignStudio",
      role: "Creative Director",
      quote: "Simplified our hiring process and delivered top-tier candidates.",
      rating: 5
    }
  ];

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-75"></div>
        <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-150"></div>
      </div>

      {/* Job Posting Modal */}
      {showJobForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
            <div className="sticky top-0 bg-white p-6 border-b border-gray-200 z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                    <Plus className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-gray-900">Post Your Dream Job</h2>
                    <p className="text-gray-600 text-sm">Reach thousands of talented youth</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowJobForm(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Form fields remain the same as your existing code */}
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-300"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-300"
                    placeholder="Your company name"
                  />
                </div>
              </div>

              {/* ... rest of your form fields ... */}

              <div className="flex gap-4 pt-6 border-t border-gray-200">
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Posting...
                    </>
                  ) : (
                    '🚀 Post Job'
                  )}
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
        <div className="fixed top-4 right-4 z-50 animate-bounce-in">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
            <div className="p-1 bg-white/20 rounded-full">
              <CheckCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="font-bold">Job posted successfully!</p>
              <p className="text-green-100 text-sm">Your job is now live for candidates</p>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 via-purple-600/90 to-pink-600/90"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Premium Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-8 animate-pulse">
            <Crown className="h-4 w-4 text-yellow-300" />
            <span className="text-sm font-semibold text-white">Trusted by 5,000+ Top Companies</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Hire Tomorrow's
            </span>
            <br />
            <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
              Leaders Today
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed font-medium">
            Connect with brilliant young talent ready to bring innovation, energy, 
            and fresh ideas to your team. Powered by AI, driven by passion. 🚀
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="group bg-gradient-to-r from-white to-gray-100 text-gray-900 hover:from-gray-100 hover:to-white font-bold shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
              onClick={() => setShowJobForm(true)}
            >
              <div className="flex items-center gap-2">
                <div className="p-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                  <Plus className="h-4 w-4 text-white" />
                </div>
                <span>Post Your First Job - Free!</span>
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Button>
            
            <Button 
              size="lg" 
              variant="ghost"
              className="text-white border-white/50 hover:bg-white/10 hover:border-white font-bold backdrop-blur-sm"
            >
              <Sparkles className="h-5 w-5 mr-2" />
              See Premium Features
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="group text-center p-6 rounded-3xl bg-gradient-to-br from-white to-gray-50 border border-gray-100 hover:border-transparent hover:shadow-2xl transition-all duration-500 hover:scale-105"
              >
                <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-r ${stat.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {stat.icon}
                </div>
                <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2 group-hover:scale-105 transition-transform duration-300">
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
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 mb-6">
              <Sparkles className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Why Choose JobHub?
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Built for <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Modern Hiring</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
              We've reimagined recruitment with cutting-edge technology and youth-focused design
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group relative"
              >
                {/* Animated Border */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${feature.color} rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200`}></div>
                
                <div className="relative bg-white p-8 rounded-3xl border-2 border-gray-100 hover:border-transparent shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:scale-105">
                  {/* Icon Container */}
                  <div className="relative mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <div className={`bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                        {feature.icon}
                      </div>
                    </div>
                    {feature.sparkle && (
                      <div className="absolute -top-2 -right-2">
                        <Sparkles className="h-4 w-4 text-yellow-500 fill-current animate-pulse" />
                      </div>
                    )}
                    <div className="absolute -top-2 -left-2 text-2xl">
                      {feature.emoji}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed font-medium">
                    {feature.description}
                  </p>

                  {/* Progress Bar Effect */}
                  <div className="mt-6 w-full bg-gray-200 rounded-full h-1">
                    <div className={`h-1 rounded-full bg-gradient-to-r ${feature.color} transition-all duration-1000 group-hover:w-full w-3/4`}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Loved by <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Amazing Companies</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See what top employers are saying about their experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-white rounded-3xl p-8 border-2 border-gray-100 hover:border-blue-200 hover:shadow-2xl transition-all duration-500 group hover:scale-105"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-black text-gray-900 text-lg">{testimonial.name}</h4>
                    <p className="text-blue-600 font-semibold">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic mb-6 text-lg">"{testimonial.quote}"</p>
                <div className="flex text-yellow-400">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Ready to Transform Your Hiring?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto font-medium">
              Join thousands of innovative companies already finding top talent with JobHub
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center text-white bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
                  <span className="text-xl mr-3">{benefit.icon}</span>
                  <span className="font-semibold">{benefit.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100 font-bold shadow-2xl hover:shadow-3xl hover:scale-105 transition-all"
                onClick={() => setShowJobForm(true)}
              >
                <div className="flex items-center gap-2">
                  <Rocket className="h-5 w-5" />
                  🚀 Start Hiring Free
                </div>
              </Button>
              <Button 
                variant="ghost" 
                size="lg" 
                className="text-white border-white hover:bg-white/10 font-bold"
              >
                <Award className="h-5 w-5 mr-2" />
                Schedule Demo
              </Button>
            </div>

            <p className="text-blue-200 text-sm mt-6">
              ✨ No credit card required • Free forever plan • Setup in 2 minutes
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Employers;