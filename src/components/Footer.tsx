import React from 'react';
import { Heart, Code, Coffee, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { usePortfolio } from '../contexts/PortfolioContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { isDark, toggleTheme } = useTheme();
  const { data } = usePortfolio();

  return (
    <footer className={`py-8 ${
      isDark ? 'bg-black/40 border-gray-800' : 'bg-gray-100/40 border-gray-200'
    } border-t`}>
      <div className="container mx-auto px-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>Made with</span>
            <Heart className={isDark ? 'text-red-400' : 'text-red-500'} animate-pulse size={16} />
            <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>and</span>
            <Coffee className={isDark ? 'text-yellow-400' : 'text-yellow-600'} size={16} />
            <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>by</span>
            <Code className={isDark ? 'text-cyan-400' : 'text-blue-600'} size={16} />
          </div>
          
          <div className={`text-2xl font-bold bg-gradient-to-r ${
            isDark ? 'from-cyan-400 to-purple-400' : 'from-blue-600 to-purple-600'
          } bg-clip-text text-transparent mb-4`}>
            {data.personalInfo.name}
          </div>
          
          <div className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm mb-4`}>
            © {currentYear} {data.personalInfo.name}. All rights reserved.
          </div>
          
          <div className={`${isDark ? 'text-gray-500' : 'text-gray-500'} text-xs mb-4`}>
            {data.personalInfo.title}
          </div>
          
          {/* Theme Toggle */}
          <div className="flex items-center justify-center">
            <button
              onClick={toggleTheme}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                isDark 
                  ? 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white' 
                  : 'bg-white/50 hover:bg-gray-100/50 text-gray-700 hover:text-gray-900'
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
              <span className="text-sm">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;