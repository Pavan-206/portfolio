import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#experience', label: 'Experience' },
    { href: '#contact', label: 'Contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? isDark 
          ? 'bg-black/90 backdrop-blur-md border-b border-purple-500/20' 
          : 'bg-white/90 backdrop-blur-md border-b border-purple-200/50'
        : 'bg-transparent'
    }`}>
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className={`text-2xl font-bold bg-gradient-to-r ${
            isDark ? 'from-cyan-400 to-purple-400' : 'from-blue-600 to-purple-600'
          } bg-clip-text text-transparent`}>
            KPK.dev
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className={`${
                  isDark ? 'text-gray-300 hover:text-cyan-400' : 'text-gray-700 hover:text-blue-600'
                } transition-all duration-300 hover:scale-105 relative group`}
              >
                {item.label}
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r ${
                  isDark ? 'from-cyan-400 to-purple-400' : 'from-blue-600 to-purple-600'
                } group-hover:w-full transition-all duration-300`}></span>
              </button>
            ))}
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all duration-300 ${
                isDark 
                  ? 'bg-gray-800/50 hover:bg-gray-700/50 text-yellow-400' 
                  : 'bg-gray-100/50 hover:bg-gray-200/50 text-gray-700'
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Navigation Toggle */}
          <button
            className={`md:hidden ${isDark ? 'text-white' : 'text-gray-900'}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className={`md:hidden mt-4 pb-4 border-t ${
            isDark ? 'border-purple-500/20' : 'border-purple-200/50'
          }`}>
            <div className="flex flex-col space-y-4 pt-4">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className={`${
                    isDark ? 'text-gray-300 hover:text-cyan-400' : 'text-gray-700 hover:text-blue-600'
                  } transition-colors duration-300 text-left`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={toggleTheme}
                className={`flex items-center gap-2 ${
                  isDark ? 'text-gray-300 hover:text-cyan-400' : 'text-gray-700 hover:text-blue-600'
                } transition-colors duration-300 text-left`}
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
                {isDark ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;