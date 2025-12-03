import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Briefcase, Menu, X, Sparkles, Rocket, MessageSquare } from 'lucide-react';
import AuthButtons from '../Auth/AuthButtons';
import Button from '../UI/Button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/', icon: <Sparkles className="h-4 w-4" /> },
    { name: 'Jobs', href: '/jobs', icon: <Briefcase className="h-4 w-4" /> },
    { name: 'Employers', href: '/employers', icon: <Rocket className="h-4 w-4" /> },
    { name: 'Contact', href: '/contact', icon: <MessageSquare className="h-4 w-4" /> }, 
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white/80 backdrop-blur-xl shadow-lg border-b border-gray-100/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1">
                <div className="bg-green-400 rounded-full p-1 animate-pulse">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                JobHub
              </span>
              <span className="text-xs text-gray-500 -mt-1">For Amazing Youth</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 group ${
                  isActive(item.href)
                    ? 'text-purple-600 bg-purple-50 shadow-sm'
                    : 'text-gray-600 hover:text-purple-500 hover:bg-gray-50'
                }`}
              >
                <div className={`transition-transform duration-300 ${
                  isActive(item.href) ? 'scale-110' : 'group-hover:scale-110'
                }`}>
                  {item.icon}
                </div>
                <span>{item.name}</span>
                {isActive(item.href) && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                )}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:block">
            <AuthButtons />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="!p-2 bg-gradient-to-r from-purple-50 to-pink-50"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200/50 py-4 space-y-2 bg-white/95 backdrop-blur-sm rounded-2xl mt-2 shadow-lg">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 text-base font-medium rounded-lg transition-all duration-300 ${
                  isActive(item.href)
                    ? 'text-purple-600 bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-500 shadow-sm'
                    : 'text-gray-600 hover:text-purple-500 hover:bg-gray-50'
                }`}
              >
                <div className={`${isActive(item.href) ? 'scale-110' : ''}`}>
                  {item.icon}
                </div>
                <span>{item.name}</span>
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-200/50">
              <div className="px-4">
                <AuthButtons />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;