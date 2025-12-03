import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Heart, Twitter, Linkedin, Github, Mail, ArrowUp, Sparkles } from 'lucide-react';
import Button from '../UI/Button';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, white 2%, transparent 0%), radial-gradient(circle at 75px 75px, white 2%, transparent 0%)`,
          backgroundSize: '100px 100px'
        }}></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-6 group">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white">JobHub</span>
                <span className="text-sm text-purple-200 -mt-1 flex items-center">
                  For Amazing Youth <Sparkles className="h-3 w-3 ml-1" />
                </span>
              </div>
            </Link>
            <p className="text-purple-200 mb-6 max-w-md text-lg leading-relaxed">
              🚀 Empowering youth with incredible career opportunities. 
              Connecting brilliant young minds with forward-thinking companies.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Twitter, href: '#', color: 'hover:text-blue-400' },
                { icon: Linkedin, href: '#', color: 'hover:text-blue-300' },
                { icon: Github, href: '#', color: 'hover:text-gray-300' },
                { icon: Mail, href: '#', color: 'hover:text-red-300' }
              ].map((SocialIcon, index) => (
                <a 
                  key={index}
                  href={SocialIcon.href} 
                  className={`bg-white/10 p-3 rounded-xl backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:scale-110 ${SocialIcon.color}`}
                >
                  <SocialIcon.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white flex items-center">
              <Sparkles className="h-4 w-4 mr-2 text-yellow-300" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {['Browse Jobs', 'For Employers', 'Career Tips', 'Success Stories'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-purple-200 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block">
                    {item}
                  </a>
                </li>
              ))}

              {/*  Added the Contact Page Link */}
              <li>
                <Link 
                  to="/contact" 
                  className="text-purple-200 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white flex items-center">
              <Heart className="h-4 w-4 mr-2 text-pink-400" />
              Support
            </h3>
            <ul className="space-y-3">
              {['Help Center', 'Contact Us', 'Privacy Policy', 'Terms of Service'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-purple-200 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-purple-800/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-purple-300 text-sm mb-4 md:mb-0">
            © 2025 JobHub. Made by mbuthia for youth empowerment and the whole world at large
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={scrollToTop}
            className="text-purple-300 border-purple-700 hover:bg-purple-800/50 hover:text-white"
          >
            <ArrowUp className="h-4 w-4 mr-2" />
            Back to Top
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
