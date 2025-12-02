import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { 
  Briefcase, Heart, FileText, Settings, Bell, Award, Rocket, Zap, 
  TrendingUp, Star, Eye, Calendar, Users, Target, BarChart3, 
  Download, Filter, ChevronRight, Clock, DollarSign, MapPin
} from 'lucide-react';
import Button from '../components/UI/Button';
import { useApplications } from '../hooks/useApplications';
import { jobsAPI, categoriesAPI } from '../services/api';

const Dashboard = () => {
  const { user } = useUser();
  const { applications, loading: appsLoading, refetch: refetchApps } = useApplications();
  const [stats, setStats] = useState({
    totalJobs: 0,
    featuredJobs: 0,
    remoteJobs: 0,
    totalApplications: 0,
    interviewCount: 0,
    avgSalary: '$0'
  });
  const [jobRecommendations, setJobRecommendations] = useState([]);
  const [categoryStats, setCategoryStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch job statistics
      const jobStats = await jobsAPI.getStats();
      const categories = await categoriesAPI.getAll();
      
      // Calculate user-specific stats
      const interviewCount = applications.filter(app => 
        app.status === 'interview' || app.status === 'under_review'
      ).length;
      
      const acceptedCount = applications.filter(app => 
        app.status === 'accepted'
      ).length;
      
      const recentApplications = applications
        .slice(0, 5)
        .map(app => ({
          ...app,
          daysAgo: Math.floor((new Date() - new Date(app.appliedAt)) / (1000 * 60 * 60 * 24))
        }));
      
      setStats({
        totalJobs: jobStats.data.totalJobs || 0,
        featuredJobs: jobStats.data.featuredJobs || 0,
        remoteJobs: jobStats.data.remoteJobs || 0,
        totalApplications: applications.length,
        interviewCount,
        acceptedCount,
        avgSalary: '$85,000'
      });
      
      setCategoryStats(categories.data || []);
      setJobRecommendations(generateRecommendations());
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateRecommendations = () => {
    // Mock recommendations - replace with AI/ML recommendations
    return [
      {
        _id: '1',
        title: "Senior React Developer",
        company: "TechNova",
        location: "Remote",
        type: "Full-time",
        salary: "$120,000 - $150,000",
        match: "95%",
        skillsMatch: ["React", "TypeScript", "Next.js"],
        urgency: "high"
      },
      {
        _id: '2',
        title: "Product Designer",
        company: "CreativeMinds",
        location: "San Francisco, CA",
        type: "Full-time",
        salary: "$110,000 - $140,000",
        match: "88%",
        skillsMatch: ["Figma", "UI/UX", "Prototyping"],
        urgency: "medium"
      },
      {
        _id: '3',
        title: "Backend Engineer",
        company: "DataSystems",
        location: "Remote",
        type: "Full-time",
        salary: "$130,000 - $160,000",
        match: "92%",
        skillsMatch: ["Node.js", "Python", "AWS"],
        urgency: "high"
      }
    ];
  };

  const userStats = [
    { 
      label: 'Applications Sent', 
      value: applications.length, 
      icon: FileText,
      color: 'from-blue-500 to-cyan-500',
      change: '+3 this week'
    },
    { 
      label: 'Interviews', 
      value: stats.interviewCount, 
      icon: Calendar,
      color: 'from-green-500 to-emerald-500',
      change: '1 upcoming'
    },
    { 
      label: 'Offers Received', 
      value: stats.acceptedCount, 
      icon: Award,
      color: 'from-purple-500 to-pink-500',
      change: stats.acceptedCount > 0 ? '🎉 Congrats!' : 'Keep going!'
    },
    { 
      label: 'Profile Views', 
      value: '45', 
      icon: Eye,
      color: 'from-orange-500 to-red-500',
      change: '+12 this month'
    }
  ];

  const quickActions = [
    {
      title: "Update Resume",
      description: "Upload latest resume",
      icon: FileText,
      action: () => console.log("Update resume"),
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Skill Assessment",
      description: "Test your skills",
      icon: Target,
      action: () => console.log("Skill assessment"),
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Career Coaching",
      description: "Book 1:1 session",
      icon: Users,
      action: () => console.log("Career coaching"),
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "Export Data",
      description: "Download applications",
      icon: Download,
      action: () => console.log("Export data"),
      color: "bg-orange-100 text-orange-600"
    }
  ];

  const activityTimeline = [
    {
      action: "Applied to",
      title: "Frontend Developer at TechCorp",
      time: "2 hours ago",
      status: "applied",
      icon: Briefcase
    },
    {
      action: "Profile viewed by",
      title: "InnovateLab Recruiter",
      time: "1 day ago",
      status: "viewed",
      icon: Eye
    },
    {
      action: "Saved job",
      title: "UX Designer at CreativeStudio",
      time: "2 days ago",
      status: "saved",
      icon: Heart
    },
    {
      action: "Skill added",
      title: "React Hooks & Context API",
      time: "3 days ago",
      status: "skill",
      icon: Zap
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-blue-600 font-semibold">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-4xl font-black text-gray-900 mb-3">
                Welcome back, {user?.firstName || 'there'}! 👋
              </h1>
              <p className="text-xl text-gray-600 font-medium">
                Here's your job search progress and personalized insights
              </p>
            </div>
            <div className="flex gap-3 mt-6 md:mt-0">
              <Button variant="secondary" className="border-2 border-gray-300 hover:border-gray-400">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="ghost" className="text-gray-600 hover:bg-gray-100">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-8 bg-white rounded-2xl p-2 shadow-lg border border-gray-200">
          {['overview', 'applications', 'jobs', 'analytics'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Stats & Quick Actions */}
          <div className="lg:col-span-2 space-y-8">
            {/* User Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {userStats.map((stat, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 group hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} shadow-md`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                      {stat.change}
                    </span>
                  </div>
                  <div>
                    <p className="text-3xl font-black text-gray-900 mb-1">{stat.value}</p>
                    <p className="text-gray-600 font-semibold">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Recommended Jobs */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black text-gray-900 flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-3 fill-current" />
                  Recommended For You
                </h2>
                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                  View All <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
              
              <div className="space-y-4">
                {jobRecommendations.map((job) => (
                  <div 
                    key={job._id} 
                    className="p-4 border border-gray-200 rounded-2xl hover:border-blue-300 hover:shadow-md transition-all duration-300 group"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-black text-gray-900 text-lg group-hover:text-blue-600 transition-colors">
                          {job.title}
                        </h3>
                        <p className="text-blue-600 font-semibold">{job.company}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {job.urgency === 'high' && (
                          <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-bold">
                            ⚡ Urgent
                          </span>
                        )}
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">
                          {job.match} Match
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-3">
                      <span className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" /> {job.location}
                      </span>
                      <span className="flex items-center">
                        <Briefcase className="h-4 w-4 mr-1" /> {job.type}
                      </span>
                      <span className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" /> {job.salary}
                      </span>
                    </div>
                    
                    <div className="mt-3">
                      <p className="text-sm text-gray-500 mb-2">Matching Skills:</p>
                      <div className="flex flex-wrap gap-2">
                        {job.skillsMatch.map((skill, idx) => (
                          <span 
                            key={idx} 
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <Button 
                      variant="primary" 
                      size="sm" 
                      className="mt-4 bg-blue-600 hover:bg-blue-700"
                    >
                      Apply Now
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Timeline */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6">
              <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center">
                <Clock className="h-5 w-5 text-blue-600 mr-3" />
                Recent Activity
              </h2>
              
              <div className="space-y-4">
                {activityTimeline.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-xl transition-colors">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <activity.icon className="h-4 w-4 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">
                        {activity.action} <span className="text-blue-600">{activity.title}</span>
                      </p>
                      <p className="text-gray-500 text-sm">{activity.time}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      activity.status === 'applied' ? 'bg-blue-100 text-blue-700' :
                      activity.status === 'viewed' ? 'bg-green-100 text-green-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Profile & Insights */}
          <div className="space-y-8">
            {/* Profile Completion */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-6 text-white shadow-2xl">
              <h3 className="text-xl font-black mb-4">Profile Strength</h3>
              <div className="space-y-4">
                {[
                  { label: 'Basic Info', progress: 90 },
                  { label: 'Skills', progress: 75 },
                  { label: 'Experience', progress: 60 },
                  { label: 'Education', progress: 85 }
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm font-semibold mb-2">
                      <span>{item.label}</span>
                      <span>{item.progress}%</span>
                    </div>
                    <div className="w-full bg-blue-500 rounded-full h-2">
                      <div 
                        className="bg-white h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="secondary" size="sm" className="w-full mt-6 font-bold">
                ⚡ Complete Profile
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
              <h3 className="text-xl font-black text-gray-900 mb-4 flex items-center">
                <Zap className="h-5 w-5 text-yellow-500 mr-3" />
                Quick Actions
              </h3>
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.action}
                    className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors group"
                  >
                    <div className="flex items-center">
                      <div className={`p-2 rounded-lg ${action.color} mr-3`}>
                        <action.icon className="h-4 w-4" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-gray-900 group-hover:text-blue-600">
                          {action.title}
                        </p>
                        <p className="text-gray-500 text-sm">{action.description}</p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600" />
                  </button>
                ))}
              </div>
            </div>

            {/* Market Insights */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
              <h3 className="text-xl font-black text-gray-900 mb-4 flex items-center">
                <BarChart3 className="h-5 w-5 text-green-600 mr-3" />
                Market Insights
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-xl">
                  <div>
                    <p className="font-semibold text-gray-900">Remote Jobs</p>
                    <p className="text-gray-500 text-sm">Growing 25% monthly</p>
                  </div>
                  <span className="text-2xl font-black text-green-600">
                    {stats.remoteJobs}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-xl">
                  <div>
                    <p className="font-semibold text-gray-900">Tech Jobs</p>
                    <p className="text-gray-500 text-sm">Highest demand</p>
                  </div>
                  <span className="text-2xl font-black text-blue-600">
                    {categoryStats.find(c => c.name === 'Technology')?.count || '0'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-xl">
                  <div>
                    <p className="font-semibold text-gray-900">Avg. Salary</p>
                    <p className="text-gray-500 text-sm">For your skills</p>
                  </div>
                  <span className="text-2xl font-black text-purple-600">
                    {stats.avgSalary}
                  </span>
                </div>
              </div>
            </div>

            {/* Achievement Badge */}
            <div className="bg-gradient-to-br from-yellow-400 to-orange-400 rounded-3xl p-6 text-white shadow-2xl">
              <div className="flex items-center mb-3">
                <Award className="h-6 w-6 mr-2" />
                <h3 className="text-xl font-black">Top Applicant</h3>
              </div>
              <p className="text-yellow-100 text-sm font-medium">
                You're in the top 10% of applicants! Your profile gets 3x more views.
              </p>
              <div className="flex items-center mt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 bg-white rounded-full border-2 border-yellow-400"></div>
                  ))}
                </div>
                <span className="ml-3 text-sm font-semibold">+24 companies viewing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;